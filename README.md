# Skills for coding agents

Personal skill collection, one universal `skills/` directory consumed by any
harness: Claude Code, OpenCode, or any skill-capable agent.

## Claude Code

```
/plugin marketplace add umichan0621/skills
```

```
/plugin install agent-skills@umichan0621
```

Claude Code discovers `skills/*/SKILL.md` natively from the plugin root
(`.claude-plugin/` holds the manifests).

## OpenCode

```sh
opencode plugin add github:umichan0621/skills
```

Or in `opencode.json` (project or `~/.config/opencode/opencode.json`), by git
spec — the form that works without an npm install:

```json
{ "plugins": ["github:umichan0621/skills"] }
```

From a checkout, shared across projects (the entry must be the
`.opencode/plugins` directory, not a file):

```json
{ "plugins": ["/abs/path/to/skills/.opencode/plugins"] }
```

Opening this repo itself in OpenCode needs no entry: it auto-discovers
`.opencode/plugins/index.js`.

## Any other skill-capable agent

Point your agent at this repo's `skills/` directory (or copy the skill
folders you want into its skills path) — every `<id>/SKILL.md` is
frontmatter (`name`, `description`) plus body, the format the major
harnesses share.

## Skills

| Skill | What it does |
| ----- | ------------ |
| `find-skills` | Discover and install skills from the open skills ecosystem |
| `frontend-design` | Production-grade frontend UI with distinctive design |
| `git-commit` | Commit messages to this repo's standard |
| `git-release` | Cut Git releases: version resolution, bilingual notes, tag push, GitLab/Gitea Release |
| `gitlab-mr` | Draft GitLab MRs from the actual branch diff via the REST API |
| `meow-notify` | Task-completion push notifications via MeoW |
| `skill-creator` | Create and improve skills |

## Develop

```sh
npm test
```
