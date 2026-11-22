---
name: plan
description: "Write an implementation plan from an approved design or spec, then execute it task by task. Use whenever a change needs more than about three steps or touches more than one module, before touching code (triggers: plan, 计划, 实施计划, 拆解, break this down, task list, implementation plan, 怎么实现). Not for one-step changes."
---

# Plan

<!-- Adapted from obra/superpowers (MIT License, Copyright (c) 2025 Jesse Vincent), skills/writing-plans and skills/executing-plans -->

## Writing the Plan

Write it for an engineer who has not seen this codebase or the spec.
Assume they write idiomatic code once they know the exact interface and
the exact test, and make a reasonable choice wherever the plan leaves
one open. What they cannot know is what you decided: which files, which
names and signatures, which values from the spec, which tests prove each
task. Document those. DRY, YAGNI, frequent commits.

**File structure first.** Before defining tasks, map which files will be
created or modified and what each one is responsible for. One clear
responsibility per file; files that change together live together;
follow the codebase's existing patterns rather than restructuring
unilaterally.

**Task right-sizing.** A task is the smallest unit that carries its own
test cycle and is worth a fresh reviewer's gate. Fold setup,
configuration, scaffolding, and documentation into the task whose
deliverable needs them; split only where a reviewer could reject one
task while approving its neighbor. Each task ends independently
testable.

**Step granularity.** Each step is one action with a checkable result:
write the failing test → run it and watch it fail → implement the
minimal code → run it and watch it pass → commit. A step is done when
the implementer can write exactly one reasonable thing from it —
unambiguous, not complete. A plan longer than the code it describes has
written the code instead; lines that decide nothing ("TBD", "handle
edge cases", "add appropriate validation") are the opposite failure.

**Interfaces.** Each task states what it consumes from earlier tasks and
what it produces for later ones — exact function names, signatures, and
types. This is how neighboring tasks learn each other's names.

**Self-review** before handing the plan over: spec coverage (every
requirement maps to a task), step scan (every step yields exactly one
reasonable thing), type consistency across tasks, and proportion
against the spec. Fix issues inline and move on.

## Executing the Plan

The plan already did the thinking. Execute it exactly, prove each step
by running its verification and reading the output, and never pause to
check in between tasks — they chose this to spend less, not to answer
"should I continue?" after every task.

**Rulings, not stalls.** Conflicts, ambiguities, plan defects: decide
them. The spec is the binding authority; your judgment settles what it
doesn't. Record every deviation as `Ruling: <decision> — <why> — <cost
if wrong>` and keep going. An unrecorded deviation is a decision made in
secret.

Only four things stop you: an irreversible or destructive operation; a
security-sensitive action; a side effect outside the workspace that
norms say to ask about first (a merge, a push to a shared branch, a
publish); and a plan so broken that every path forward is a guess.

Completion claims — per task and for the plan as a whole — go through
the `verify` skill: fresh evidence before you say something works.
