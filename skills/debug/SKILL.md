---
name: debug
description: "Use for any bug, test failure, build failure, unexpected behavior, or performance problem, before proposing or writing any fix — including when the fix seems obvious, the bug seems small, or time pressure is high; those are the cases where guessing costs most (triggers: debug, 调试, 排查, bug, 报错, 又坏了, 改了没生效, fails, broken, crash, why does, root cause, 根因)."
---

# Debug

<!-- Adapted from obra/superpowers (MIT License, Copyright (c) 2025 Jesse Vincent), skills/systematic-debugging -->

**Core principle:** ALWAYS find root cause before attempting fixes.
Symptom fixes are failure.

## The Iron Law

```
NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST
```

Phase 1 incomplete → no fixes. Least of all when: the bug seems simple,
you are in a hurry, you have already tried several fixes, or the
previous fix didn't work — those are exactly when guessing feels most
tempting and costs most.

## Phase 1: Root Cause Investigation

1. **Read the error completely.** Stack traces, line numbers, codes.
   Errors often contain the solution; skipping past them is how the
   obvious stays unseen.
2. **Reproduce consistently.** Exact steps, every time? If not, gather
   more data — don't guess at a flake.
3. **Check recent changes.** `git diff`, recent commits, new
   dependencies, config and environment deltas. Something changed.
4. **Instrument boundaries in multi-component systems** (api → service →
   db, ci → build → sign): log what enters and exits each component,
   run once, and let the evidence name the failing layer before you
   investigate inside it.
5. **Trace data to its source.** Where does the bad value originate?
   Keep tracing up the call chain until you find where it was born. Fix
   at the source, not where it exploded.

## Phase 2: Pattern Analysis

What worked before, and what is different now? What does this bug have
in common with the last one in this area? Which layer's contract does
the evidence violate?

## Phase 3: Fix at Root Cause

Fix the mechanism, not the symptom. Before editing a function, check
every caller of it — the correct fix is usually one guard in the shared
path, not one guard per caller.

## Phase 4: Verify and Check Siblings

Prove the original symptom gone with a run you watched — under the
`verify` skill's gate: fresh evidence, not memory of having fixed it.
Then ask what else shares the broken assumption — the same bug usually
has siblings.

## Rationalizations

| Excuse | Reality |
|--------|---------|
| "Just one quick fix" | Fixes without root cause become rework |
| "I know this codebase" | Familiarity is where assumptions hide |
| "The fix is obvious" | Obvious fixes to unreproduced bugs are guesses |
| "No time to be systematic" | Thrashing is slower than four phases |
| "It worked before" | Something changed; find it |
