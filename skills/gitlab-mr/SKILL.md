---
name: gitlab-mr
description: "Create a Draft merge request on GitLab by analyzing the actual diff between two branches: generates a title + numbered summary (5-10 lines, no file listings) and creates the MR via the GitLab REST API. Use this whenever the user wants to create or prepare an MR/PR (triggers: mr, pr, create mr/pr, 生成 mr/pr, merge request, pull request), or wants MR/PR description text, a changelog, or release notes derived from branch changes. GitLab-hosted repos only — for GitHub PRs use gh pr create instead. Target branch is required; ask if missing, never guess. Source branch defaults to the current branch. Requires a one-time GitLab PAT (api scope) at ~/.gitlab_token or in $GITLAB_TOKEN; if missing or invalid, tell the user explicitly and fall back to pushing the branch and writing MR.md at the repo root."
---

# Core Principles

- **Diff-based**: Generate the MR summary from actual code changes, not commit messages
- **Target branch required**: The user must declare the target branch; if missing, ask — never guess
- **Source branch optional**: Defaults to the current branch
- **Ultra-compact**: Title + numbered summary (5-10 lines), no file change listings
- **API delivery, full markdown**: The MR is created via the GitLab API so the description keeps newlines and renders as a real markdown list. `git push -o` is NOT usable for the description — git itself rejects push options containing newlines (`fatal: push options cannot contain newlines`)
- **English output**: Always write the MR title and summary in English unless the user explicitly requests another language

## One-time Setup (token)

The API needs a Personal Access Token; git HTTP credentials (username/password) do not work for the API.

1. GitLab → User Settings → Access Tokens → create a token with `api` scope
2. Store it (file works in non-interactive shells where `.zshrc` env vars are absent):
   ```bash
   echo 'glpat-xxxx' > ~/.gitlab_token && chmod 600 ~/.gitlab_token
   ```
   `$GITLAB_TOKEN` is also honored if set.

## Workflow

### 1. Confirm Parameters

- `target` (required): the branch the MR merges into. If not provided by the user, ask before doing anything else.
- `source` (optional): the branch carrying the changes. Defaults to the current branch (`git branch --show-current`).

### 2. Verify Token

```bash
TOKEN=$(cat ~/.gitlab_token 2>/dev/null || echo "$GITLAB_TOKEN")
# resolve <host> first: git remote get-url origin
curl -s -o /dev/null -w "%{http_code}" --max-time 10 \
  -H "PRIVATE-TOKEN: $TOKEN" http://<host>/api/v4/user
```

- `200` → token works, continue with the API workflow below
- `401` → token exists but is invalid/expired
- token empty/unset → no token configured

On `401` or empty, **explicitly tell the user which case it is** and give the One-time Setup steps above, then take the fallback path (see step 7). Do not silently continue and never flatten the description.

### 3. Sync and Analyze

```bash
git fetch origin
git diff --stat origin/<target>...<source>     # overview
git diff origin/<target>...<source>            # detailed diff for analysis
git diff --name-status origin/<target>...<source>
git log origin/<target>..<source> --oneline    # reference only, not the source of truth
```

If `origin/<source>` does not exist yet (branch not pushed), the local ref `<source>` still works in the diff.

Generate from the diff:

- **Title**: `<type>(<scope>): <summary>` — one line
- **Summary**: a single `## <emoji> <Category>` header followed by a numbered list of changes (see Change Types table). Full markdown is allowed, including newlines.

### 4. Push the Branch

```bash
git push -u origin <source>
```

### 5. Resolve Host and Project

```bash
git remote get-url origin     # http(s)://<host>/<group>/<project>(.git)
```

Strip the scheme and `.git` suffix, keep `<host>` and the path `<group>/<project>`. URL-encode the project path (only `/` → `%2F`):

```bash
python3 -c 'import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1], safe=""))' "<group>/<project>"
```

### 6. Create the Draft MR via API

```bash
TOKEN=$(cat ~/.gitlab_token 2>/dev/null || echo "$GITLAB_TOKEN")
curl -sL -H "PRIVATE-TOKEN: $TOKEN" \
  "http://<host>/api/v4/projects/<project-encoded>/merge_requests" \
  -X POST \
  --data-urlencode "source_branch=<source>" \
  --data-urlencode "target_branch=<target>" \
  --data-urlencode "title=Draft: <title>" \
  --data-urlencode "description=<markdown summary, newlines preserved>" \
  --data-urlencode "remove_source_branch=true"
```

The `Draft: ` title prefix is what marks the MR as a draft. `--data-urlencode` is what carries newlines and markdown safely.

### 7. Fallback: No/Invalid Token

When the token check in step 2 fails, do all of the following:

1. **Tell the user explicitly**: missing or invalid token, plus the One-time Setup steps
2. **Push the branch anyway** (needs no token): `git push -u origin <source>`
3. **Write the MR content to local file** `<repo-root>/MR.md` (repo root via `git rev-parse --show-toplevel`), full markdown with newlines preserved
4. **Print the full title + summary in the conversation** so the user can copy it directly
5. Remind the user: once the token is configured, rerun to create the Draft MR automatically

### 8. Verify and Report

- **Success**: the JSON response contains `web_url` → report the MR URL to the user
- **Already exists** (`message` mentions another open merge request for the source branch): look up the open MR and update it instead of creating a duplicate:
  ```bash
  curl -sL -H "PRIVATE-TOKEN: $TOKEN" \
    "http://<host>/api/v4/projects/<project-encoded>/merge_requests?source_branch=<source>&state=opened"
  # take .iid from the response, then refresh title/description:
  curl -sL -H "PRIVATE-TOKEN: $TOKEN" \
    "http://<host>/api/v4/projects/<project-encoded>/merge_requests/<iid>" \
    -X PUT --data-urlencode "title=Draft: <title>" --data-urlencode "description=<markdown summary>"
  ```
- **401 / no token**: take the fallback path (step 7)
- **Other errors**: report the `message` field verbatim

## MR Content Structure

```markdown
feat(scope): brief title

## ✨ Features - [Category]

1. First change
2. Second change
3. Third change
```

**Only Title + Summary needed.** No file details, branch info, stats, or commit history.

## Change Types

| Type | Emoji |
|------|-------|
| feature | ✨ Features |
| bugfix | 🐛 Fixes |
| refactor | ♻️ Refactoring |
| performance | ⚡ Performance |
| security | 🔒 Security |
| docs | 📝 Documentation |
| test | ✅ Tests |
| chore | 🔧 Maintenance |
| breaking | 💥 Breaking |

## Requirements

1. **Ask for the target branch**: never guess it; the source branch defaults to the current branch
2. **Analyze diff**: Focus on actual code changes, not commit messages
3. **Ultra-compact**: Title + numbered summary, 5-10 lines total
4. **No file details**: Skip file change listings (added files, modified files, deleted files)
5. **One emoji header**: Cover main changes with single category
6. **API, not push options**: `git push -o merge_request.description=...` cannot contain newlines — always create/update the MR through the REST API with `--data-urlencode`
7. **Local file only on fallback**: write `MR.md` to the repository root only when the token is missing or invalid; the API path writes nothing local
8. **English by default**: Unless the user explicitly requests another language