---
name: humanize-chinese
description: Detect and rewrite AI-like Chinese text with a practical workflow for scoring, humanization, academic AIGC reduction, and style conversion. Use when the user asks to 去AI味, 降AIGC, 去除AI痕迹, 论文降重, 知网检测, 维普检测, humanize chinese, detect AI text, or make Chinese text sound more natural.
---

# Humanize Chinese

Use this skill when you need to detect AI-like Chinese writing, rewrite it to feel less synthetic, reduce AIGC signals in academic prose, or convert the text into a more specific Chinese writing style.

## When to Use
- Use when the user says `去AI味`, `降AIGC`, `去除AI痕迹`, `让文字更自然`, `改成人话`, or `降低AI率`
- Use when the user wants a Chinese text checked for AI-writing patterns or suspicious phrasing
- Use when the user wants academic-paper-specific AIGC reduction for CNKI, VIP, or Wanfang-style checks
- Use when the user wants Chinese text rewritten into a different style such as `zhihu`, `xiaohongshu`, `wechat`, `weibo`, `literary`, or `academic`

## Core Workflow

### 1. Detect Before Rewriting

Treat these as style observations, not proof of AI authorship or a reliable AIGC percentage. Do not promise to pass CNKI/VIP/Wanfang detection or alter disclosure obligations. Preserve the actual research claim: changing 研究表明 to 前人研究发现 can change who conducted the study and requires source evidence.

Start by identifying the most obvious AI markers instead of rewriting blindly:

- rigid `first/second/finally` structures
- mechanical connectors such as `综上所述`, `值得注意的是`, `由此可见`
- abstract grandiose wording with low information density
- repeated sentence rhythm and paragraph length
- academic prose that sounds too complete, too certain, or too template-driven

If the user provides a short sample, call out the suspicious phrases directly before rewriting.

### 2. Rewrite in the Smallest Useful Pass

Prefer targeted rewrites over total regeneration:

- remove formulaic connectors rather than paraphrasing every sentence
- vary sentence length and paragraph rhythm
- replace repeated verbs and noun phrases
- swap abstract summaries for concrete observations where possible
- keep the original claims, facts, citations, and terminology intact

### 3. Validate the Result

After rewriting, verify that the text:

- still says the same thing
- sounds less templated
- uses more natural rhythm
- does not introduce factual drift
- stays in the correct register for the target audience

For academic text, preserve a scholarly tone. Do not over-casualize.

## Manual Rewrite Playbook

### Common AI Markers

- numbered or mirrored structures that feel too symmetrical
- filler transitions that add no meaning
- repeated stock phrases
- overly even sentence length
- conclusions that sound final, polished, and risk-free

### Rewrite Moves

- delete weak transitions first
- collapse repetitive phrases into one stronger sentence
- split sentences at natural turns instead of forcing long balanced structures
- merge choppy sentences when they feel robotic
- replace generic abstractions with concrete wording
- introduce light variation in cadence so the prose does not march at a constant tempo

## Academic AIGC Reduction

For papers, reports, or theses:

- keep discipline-specific terminology unchanged
- replace AI-academic stock phrases with more grounded scholarly phrasing
- reduce absolute certainty with measured hedging where appropriate
- vary paragraph structure so each section does not read like the same template
- add limitations or uncertainty if the conclusion feels unnaturally complete

Examples of safer direction changes:

- `本文旨在` -> `本文尝试` or `本研究关注`
- `具有重要意义` -> `值得关注` or `有一定参考价值`
- `研究表明` -> `前人研究发现` or `已有文献显示`

Do not invent citations, evidence, or data.

## Style Conversion

Use style conversion only after the base text is readable and natural.

Supported style directions:

- `casual`
- `zhihu`
- `xiaohongshu`
- `wechat`
- `academic`
- `literary`
- `weibo`

When switching style, keep the user's meaning stable and change only tone, structure, and surface wording.

## Output Rules

- Show the main AI-like patterns you found
- Explain the rewrite strategy in 1-3 short bullets
- Return the rewritten Chinese text
- If helpful, include a short note on remaining weak spots

## Source

Adapted from [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills) (MIT), which in turn adapted it from the `voidborne-d/humanize-chinese` project. CLI scripts referenced by the original were removed; this is the manual playbook only.

## Limitations
- Use this skill only when the task clearly matches the scope described above.
- Do not treat the output as a substitute for environment-specific validation, testing, or expert review.
- Stop and ask for clarification if required inputs, permissions, safety boundaries, or success criteria are missing.
