---
name: git-commit
description: "Write git commit messages to this repo's standard: a Conventional Commits header, plus a bullet list when there is more than one logical change. Use this whenever the user asks to commit, save work to git, write or fix a commit message, or check a message before committing (triggers: commit, 提交, 提交信息, 写 commit, git commit, commit message). Write the message in English unless the user explicitly asks for another language. Not for rebase, squash, or history rewriting."
---

# Git Commit Standard

A commit message states what changed and why, one logical change per bullet, written from the staged diff.

## Workflow

1. `git status` — if the worktree has several independent functions, plan the commit boundaries first (see Splitting commits).
2. Stage one function's files, then read `git diff --cached`. Base the message on that diff, not on memory of the conversation.
3. Count the logical changes that remain in this commit → Level 1 (1) or Level 2 (≥2).
4. `git commit -m "$(cat <<'EOF' … EOF)"` so the body keeps newlines. Repeat from step 2 for the next function.

## Splitting commits

When the worktree holds more than one independent functional change, make one commit per function instead of one large commit.

- Files that jointly implement one function go in the same commit; unrelated changes go in separate commits.
- **A file is the atomic unit.** Never split one file's edits across commits just because it contains several edits — commit the file whole.
- Keep pre-existing unrelated worktree changes out of your commits. If a file mixes your change with unrelated edits, say so instead of reverting or committing the rest blindly.
- Split before staging: plan the commit boundaries, then stage one function's files at a time.

## Format

```
<type>(<scope>): <subject>

- change point

[optional footer]
```

- Type: `feat` `fix` `docs` `style` `refactor` `perf` `test` `chore`
- Scope: module, directory, or component touched (`auth`, `api/users`, `skills`)
- Subject: imperative, lowercase, no trailing period, ≤50 chars (72 max)
- Bullets (Level 2 only): one line per logical change; say what changed and, if not obvious, why. Never "fixed it".
- Footer: `BREAKING CHANGE: <what breaks>` / `Refs: #123` / `Co-authored-by: Name <email>`

## Level

| Logical changes | Message |
|---|---|
| 1 | header only |
| ≥2 | header + bullets |

Count logical changes, not files or lines: a bug fixed across `api.js` + `service.js` is 1; that fix plus a `README.md` update is 2 (and splits into two commits); five `.md` files for one guide is 1. Split independent changes into separate commits first — the level counts only what remains in one commit. Level 2 therefore means the change points genuinely cannot be separated: the same file, or one function whose parts are meaningless alone. Type never decides the level — a one-point `feat` is Level 1.

## Language

English unless the user explicitly asks otherwise. One language per message, no mixing.

## Secrets

Do not commit real credentials: `sk-...`, `AKIA...`, `password=...`, `mongodb://user:pass@...`, `-----BEGIN … PRIVATE KEY-----`. Placeholders in `.env.example`, fake fixture values, and comments are fine. If a real secret is staged, stop and tell the user.

## Check

- [ ] Written from the staged diff
- [ ] One function per commit, whole files only
- [ ] Header `type(scope): subject`, subject ≤50 (72 max), level matches change count
- [ ] Level 2: one bullet per change, same language
- [ ] No real secrets staged

## Example

```
fix(auth): prevent token expiry during long sessions

- Refresh tokens when less than 15min remains
- Retry once on 401 before failing the request
```

More examples (every type, edge cases): `examples/commit-examples.md`. Avoid `fix: bug fix`, `update: changes`, `wip: stuff`.