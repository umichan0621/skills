---
name: design
description: "Run a design conversation before building anything non-trivial: a new feature, module, behavior change, or refactor whose shape is not fully specified. Use when the request leaves meaningful decisions open (triggers: design, brainstorm, 方案, 设计, 新功能, 技术方案, before you build, how should we). Do not use for self-sufficient requests where every detail is already in the ask — just do those and say what you did."
---

# Design

<!-- Adapted from obra/superpowers (MIT License, Copyright (c) 2025 Jesse Vincent), skills/brainstorming -->

You build what you believe your partner wants, and that belief is
thinner than it feels. This skill finds out what they actually want, and
why, before anything gets built.

## First: What Do You Actually Know?

- **Everything that matters is in the request** — a quick, clear task.
  Do it, and say what you did. This skill is done.
- **Something non-trivial is missing** — start the conversation below.

## The Conversation

**Look before you ask.** Read what they referred to and the code it
connects to, until you can explain how the relevant parts work today.
Never ask what the project or their context already answers, and never
reopen what they have already decided.

**Get them describing.** Until you know why they want it, ask open
questions — one at a time, no options attached; their own words carry
intent your options can't. Ask only when the answer would change what
gets built. Otherwise state your call and your reason as a proposal they
can correct, and move the work forward.

**Ground to cover** (territory, not a script):

- what kind of thing this is, and what makes it special
- why now, and what success looks like to them
- goals, non-goals, and anti-goals — what would make this a failure
  even if it technically works
- prior art they loved or hated; what exists and what they tried
- the details they care about

**Play it back.** As soon as you understand one part well enough to
describe it, play it back in ~200 words, then continue with questions
about the next part. Only what they said goes in as theirs; anything you
filled in goes in as your proposal, with your reason.

## Lay Out the Approaches

Once you understand what they want, put the ways of building it in a
message of their own: two or three real alternatives, sketched
concretely against what the project actually does, each with what it
trades off. Drop the weak ones yourself. Recommend one and say why, then
ask which way to go. If there is genuinely one sensible way, say so and
explain why the others don't fit — the design comes in the next message.

## The Design Doc

After the approach is picked, write the design, sized to the work:

- **Short** (default): goal, non-goals, the approach, and the key
  choices with your call on each.
- **Full** (multi-part work): the above plus file and module layout,
  data flow, failure modes, and migration path.

Get their approval of the doc before planning or implementation. Their
approval covers the approach and the design together.

**Spike to feel things out.** When a quick throwaway build is the
cheapest way to learn what they want or whether something works, offer
one. Spikes get no tests, no plan, no review — bring what the spike
taught you back into the conversation.
