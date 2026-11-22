---
name: verify
description: "Use immediately before claiming any work is complete, fixed, or passing — before committing, pushing, or declaring done (triggers: verify, 验证, done, 完成, tests pass, fixed, should work now). Evidence before claims, always."
---

# Verify

<!-- Adapted from obra/superpowers (MIT License, Copyright (c) 2025 Jesse Vincent), skills/verification-before-completion and skills/test-driven-development -->

## The Iron Law

```
NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE
```

If you haven't run the verification command in this session, you cannot
claim it passes.

## The Gate

Before claiming any status or expressing satisfaction:

1. **Identify** — what command proves this claim?
2. **Run** — the full command, fresh.
3. **Read** — the whole output, the exit code, the failure count.
4. **Confirm** — does the output actually say what you are about to say?
5. Only then make the claim, with the evidence attached.

Skip any step and you are not verifying, you are narrating.

## What Each Claim Requires

| Claim | Requires | Not sufficient |
|-------|----------|----------------|
| Tests pass | Test output: 0 failures | Previous run, "should pass" |
| Build succeeds | Build command exit 0 | Linter passing, logs look good |
| Bug fixed | The original symptom tested and gone | Code changed, assumed fixed |
| Regression test works | Watched it fail, then pass | Test passes once |
| Subagent completed | Diff shows the changes | The subagent's "success" report |
| Requirements met | Line-by-line checklist | Tests passing |

**The red-green rule:** a regression test you never watched fail proves
nothing — it may have passed before the fix existed. Write it, watch it
fail, make it pass.

## Red Flags — Stop

- "should", "probably", "seems to"
- Satisfaction expressed before verification ("done!", "perfect!")
- About to commit or push on the strength of a partial check
- Trusting a subagent's success report instead of the diff
- "Just this once"

Any wording implying success without fresh evidence is the failure mode
this skill exists to catch.
