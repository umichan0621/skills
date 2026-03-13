---
name: git-merge
description: Generate ultra-compact MR/PR documents from diff analysis: Title + numbered summary (5-10 lines total). No file change listings. Use when user requests: MR/PR document generation, changelog, release notes, merge/pull request documentation, or similar version control change summaries (triggers: mr, pr, merge, pull, create mr/pr, 生成 mr/pr, 文档, changelog, release notes, etc.). Analyze remote branch diffs (origin/develop...origin/feat_mr), not commit messages. Output written to MR.md at git repository root.
---

# Core Principles

- **Diff-based**: Generate changelog from actual code changes, not commit messages
- **Remote branches**: Use pushed remote branches (`origin/develop...origin/feat_mr`)
- **Ultra-compact**: Title + numbered summary (5-10 lines), no file change listings
- **Git repository root**: Write to `MR.md` at the git repository root (use `git rev-parse --show-toplevel` to get absolute path)

## Workflow

### 1. Push Branch First
```bash
git push -u origin feat_mr
```

### 2. Generate MR Document
```bash
# Get diff for analysis
git diff origin/develop...origin/feat_mr
# Get repository root (for MR.md location)
git rev-parse --show-toplevel
# Or ask LLM directly: "Generate MR document for origin/feat_mr vs origin/develop"
```
Document is automatically written to `MR.md` at the git repository root.

### 3. Create MR/PR
Copy content from `MR.md` to the MR/PR description field.

## MR Document Structure

```markdown
# feat(scope): brief title

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

## Key Commands

```bash
# Diff statistics
git diff --stat origin/develop...origin/feat_mr

# Detailed diff
git diff origin/develop...origin/feat_mr

# File change status
git diff --name-status origin/develop...origin/feat_mr

# Commit history (reference only)
git log origin/develop..origin/feat_mr --oneline
```

## Example

```markdown
# feat(git-commit-standard): optimize MR workflow, add LLM-based MR generation

## ✨ Features - MR/PR Document Generation

1. Removing external script dependencies
2. Implementing LLM-based MR document generation from diff analysis
3. Adding comprehensive MR generation documentation
4. Adding universal .gitignore file
```

## Integration

Works best with:
- **git-commit-standard**: Ensures standardized commits
- **git-master**: Handles git operations

Recommended usage:
```typescript
task(
  category="quick",
  load_skills=["git-master", "git-merge"],
  prompt="Generate MR document for current branch comparing to develop"
)
```

## Requirements

1. **Use remote branches**: `origin/develop...origin/feat_mr`
2. **Analyze diff**: Focus on actual code changes, not commit messages
3. **Ultra-compact**: Title + numbered summary, 5-10 lines total
4. **No file details**: Skip `新增文件`、`修改文件`、`删除文件`
5. **One emoji header**: Cover main changes with single category
6. **Write to repository root**: Always write `MR.md` to the git repository root (use `git rev-parse --show-toplevel` to get absolute path, then write to `<repo-root>/MR.md`)