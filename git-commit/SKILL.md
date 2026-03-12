---
name: git-commit
description: Git commit standard with change-count based levels (1/2). Use for ALL git commits. MANDATORY: follow this format.
---

# Git Commit Standard

## Format

```
<type>(<scope>): <subject>

- 改动点 1 (Level 2)
- 改动点 2 (Level 2)

[Footer - optional]
```

**Header (all levels)**:
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`
- Scope: module/file/component (e.g., `auth`, `api/users`)
- Subject: ≤50 chars, lowercase, imperative, no period

**Level detection**:
| 改动数量 | Level | Requirements |
|--------|--------|--------------|
| 1 | 1 | Level 1: 仅 Header |
| ≥2 | 2 | Level 2: Header + 改动列表 |

## Validation Checklist

- [ ] Header format correct
- [ ] Subject ≤50 chars, lowercase
- [ ] 改动列表存在 (Level 2)
- [ ] No secrets (API keys, passwords, tokens)

## Sensitive Info Detection

**CRITICAL**: Block commits containing:
- API keys: `sk-...`, `AKIA...`, `eyJhbGci...`
- Passwords: `password=...`, `secret=...`
- URLs: `mongodb://...`, `postgresql://...`
- SSH: `-----BEGIN.*PRIVATE KEY-----`

## Sensitive Info Detection (Continued)

**Safe**: Comments, `.example` files, test fixtures

## 改动数量判断指南 (Complexity)

### 判断原则
按逻辑功能判断，而非文件数量或行数。一个逻辑功能点的改动计为 1 个改动。

### 判断标准
- **单一改动 (Level 1)**: 仅涉及一个逻辑修复、一个配置更新、或一个文档补充。
- **多个改动 (Level 2)**: 涉及多个不相关的修复、新功能的多个组件实现、或跨模块的协调改动。
- **文件、模块、功能点的组合**: 即使涉及多个文件，如果它们共同实现同一个逻辑功能，仍计为 1 个改动。

### 示例
1. **单一改动 vs 多个改动 (Auth)**:
   - **1 个改动**: 仅修复登录页面的 CSS 样式错误。
   - **≥2 个改动**: 修复登录页面样式 + 更新登录接口的超时逻辑。
2. **跨文件单一逻辑 (Fix)**:
   - **1 个改动**: 修改 `api.js` 和 `service.js` 以修复同一个获取用户信息失败的 bug。
   - **≥2 个改动**: 修改 `api.js` 修复获取用户信息 bug + 修改 `README.md` 更新安装说明。
3. **功能扩展 (Feat)**:
   - **1 个改动**: 在现有表单中增加一个“备注”输入框。
   - **≥2 个改动**: 增加“备注”输入框 + 增加点击备注自动弹窗提示的功能。

### 边缘情况
- **小修复**: 即使是 1 行代码的修复，只要逻辑独立，就计为 1 个改动。
- **配置更新**: 修改 `.env` 或 `package.json` 的版本号，计为 1 个改动。
- **文档更新**: 即使修改了多个 `.md` 文件，如果内容属于同一主题（如“入门文档”），计为 1 个改动。

## Quick Examples

**Level 1 (1 个改动)**:
```
docs(readme): update installation instructions
chore(deps): bump lodash to 4.17.21
```

**Level 2 (≥2 个改动)**:
```
fix(auth): prevent token expiration and improve error handling

- Implement sliding window token refresh when <15min to expiry
- Add automatic retry logic for 401 unauthorized errors
- Log detailed error context for debugging session failures
```

## Type Guidelines

- **`feat`**: Minimum Level 2. Requires multiple functionality points.
- **`fix`**: Can be Level 1 or 2. Requires verification.

## More Examples

See `examples/commit-examples.md` for:
- All levels with detailed examples
- Domain-specific patterns (frontend, backend, DevOps, ML, robotics, security)
- Type-specific templates (feat, fix, perf, refactor, etc.)

## Anti-Patterns

❌ Bad: `fix: bug fix`, `update: changes`, `wip: stuff`

❌ Vague:
```
fix(auth): fix login issue
- fixed it
```

✅ Good: Always explain WHY + HOW with evidence.