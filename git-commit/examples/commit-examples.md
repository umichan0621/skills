# Git Commit Examples

This document provides realistic examples for the change-count based commit standard.

## Level 1 (1 个改动)

Level 1 commits contain only a header. Use this for single logical changes.

### feat
```
feat(ui): add loading spinner to submit button
```

### fix
```
fix(auth): correct password validation regex
```

### docs
```
docs(api): add examples for user creation endpoint
```

### chore
```
chore(deps): update express to version 4.18.2
```

---

## Level 2 (≥2 个改动)

Level 2 commits include a header and a bulleted list of specific changes. Each bullet point should be under 50 characters.

### feat
```
feat(auth): implement social login with google and github

- Add OAuth2 flow for Google provider
- Implement GitHub authentication strategy
- Add login buttons for social providers
- Map social profile data to internal model
```

### fix
```
fix(cart): resolve checkout crash and update tax calculation

- Fix null pointer exception in summary
- Update tax rate for international shipping
- Validate for empty cart before checkout
```

### refactor
```
refactor(logger): unify log levels and extract transport logic

- Standardize log levels across all modules
- Extract transport to utility class
- Implement log rotation for production
```

### perf
```
perf(db): optimize user search query and add missing indices

- Add index on email and status fields
- Use partial indexing for active users
- Rewrite search to avoid full table scan
```

### docs
```
docs(setup): overhaul installation guide and add troubleshooting

- Rewrite setup for local development
- Add troubleshooting for common Docker issues
- Update minimum Node.js versions
```

### chore
```
chore(ci): migrate to github actions and update lint rules

- Replace CircleCI with GitHub Actions
- Update ESLint rules for TypeScript
- Add automated PR labeling by file
```

---

## Edge Cases

Examples of how to apply the "change count" logic in tricky scenarios.

### Small Fixes (Level 1)
Even a single line of code can be a logic-independent fix.
```
fix(api): handle undefined user id in request params
```

### Config Updates (Level 1)
Updating environment variables or dependency versions counts as one logical change.
```
chore(config): update database connection timeout
```

### Doc Updates (Level 1)
Multiple file changes that belong to the same logical theme (e.g., "Deployment Guide") count as one change.
```
docs(guides): update deployment steps for all environments
```

### Mixed Logical Changes (Level 2)
When combining a fix with a documentation update or multiple unrelated tasks.
```
fix(ui): fix button alignment and update docs

- Correct flexbox centering in component
- Update component docs with new props
```