---
name: git-release
description: Cut a Git release end to end: resolve the next version from repo tags, write bilingual release notes from the actual diff, create and push the annotated tag, publish or edit GitLab/Gitea Releases. Trigger on 发版、发布/补发新版本、打 tag/推送 Tag、对比版本、生成更新说明、补建或编辑 Release, and on English asks like "cut a release", "write release notes", "tag and publish v1.2" — including notes-only or tag-only requests. For MR/PR descriptions use gitlab-mr instead.
---

# Git Release

A Git tag identifies the released commit. The hosting platform's Release page holds the editable notes. Treat them as separate operations.

## Choose the requested operation

| Request | Do |
|---|---|
| Invoke `git-release` without arguments, or say “发版” | Publish the next patch version, including the tag and Release page. |
| “发布 1.21.1” | Publish the specified version, not an inferred one. |
| “只生成更新说明” or “对比两个版本” | Return the notes only. Do not change files, create tags, push, or write to the hosting platform. |
| “打 Tag” / “打 Tag 然后推送” | Create the tag; push it only if requested. Do not create a Release. |
| Edit an existing Release description | Read and update only the requested fields. Do not touch the tag. |

## Resolve the target and versions

1. Use the requested target commit or otherwise the current branch HEAD. For a full release, verify the target is reachable from the intended branch on the destination remote. Use the explicitly selected remote or the branch's upstream remote (otherwise an unambiguous `origin`). Stop if the target or destination is unclear, or if relevant uncommitted changes or unpushed commits would be left out. Do not commit or push a branch on the user's behalf as part of this workflow.
2. Refresh the relevant remote refs and verify candidate tags against the destination remote; a local-only tag is not evidence of a published version. Peel annotated tags to their commits. For a new release, use the highest stable SemVer tag reachable from the target, sorted numerically, not by date or string order. Recognize `1.20.1` and `v1.20.1`, ignore prereleases such as `-rc.1` and `-beta.1`, and honor an explicitly chosen baseline. For an existing target tag, exclude that tag and any same-version alias; select the highest lower stable version reachable from its commit unless given a different baseline. Do not include unrelated release branches.
3. Honor the requested version. Otherwise increment the baseline's patch and keep the established prefix (`1.20.1` → `1.20.2`, `v1.20.1` → `v1.20.2`). When the user specifies a version without a prefix, follow the repository's established prefix; honor an explicitly specified tag name. Do not assume `1.21.0` exists just because the user requests `1.21.1`. Ask when there is no baseline, conflicting tag conventions, or conflicting tag targets. For an implicit bump with no committed changes since the baseline, stop rather than publishing an empty release.
4. For a tag that already exists, verify its target. Reuse it if it points to the intended commit; stop on a mismatch, and never move, delete, or force-push a tag. For a Release-only request tied to an existing tag, use that tag's commit, not the current HEAD. If both tag and Release already exist, report their location; update the description only when requested. If resuming a partial publication, use the original version explicitly rather than bumping again.
5. Check relevant version declarations and build/test evidence. Flag discrepancies or failed checks before publishing; don't silently bump repository versions, build or upload distribution packages, or edit unrelated files. Before writing, state the resolved baseline, version, target and destination. If the request authorizes publishing and all checks pass, proceed without asking for another confirmation.

## Write the notes from the diff

Compare `git diff <baseline> <target>` (use the target tag when it already exists). Inspect the actual diff, not just its stats or commit messages. Summarize user-visible changes; make compatibility claims only when supported. Include ordinary packaging or upgrade instructions only if a change makes them relevant.

Write English first, then a blank line, a Markdown `---` divider, another blank line, and the Chinese equivalent. Do not add “English” or “中文” headings. Use only applicable section headings, for example `### Added`, `### Fixed`, `### Build and compatibility` and their Chinese equivalents.

## Create the tag and Release

For a full release, check the platform, credentials, project access, and existing Release **before** creating or pushing a tag. Confirm the platform using repository configuration or reliable host/API evidence; ask when a self-hosted remote is ambiguous. Honor a configured base path and use the instance's documented HTTPS API where available. Never print or paste tokens, forward credentials across redirects, or silently downgrade to HTTP. If credentials are missing or rejected, explain how to configure them and stop before publishing.

Create an **annotated tag with one line and no body**, for example `git tag -a 1.20.2 <commit> -m '1.20.2'`. When authorized, push only the exact tag (for example `git push origin refs/tags/1.20.2:refs/tags/1.20.2`), without force. If the push is rejected because the remote tag already exists, re-verify that tag's target and stop — never force it or delete-and-repush. Confirm the remote tag resolves to the intended commit before creating the Release.

| Platform | Release API | Authentication |
|---|---|---|
| GitLab | `/api/v4/projects/{encoded-project-path}/releases`: `POST` to create, `GET` or `PUT` on `/releases/{tag}` relative to the project endpoint. | `PRIVATE-TOKEN` header; `GITLAB_TOKEN` or `~/.gitlab_token`. |
| Gitea | `/api/v1/repos/{owner}/{repo}/releases`: `POST` to create, `GET /releases/tags/{tag}` relative to the repo endpoint to find it, `PATCH /releases/{id}` to update. | `Authorization: token …` header; `GITEA_TOKEN` or `~/.gitea_token`. |

Use the existing tag and send the title (`<project> <version>`), tag name, and complete notes as `description` (GitLab) or `body` (Gitea). Encode path parameters and preserve Markdown line breaks. For edits, send only the requested fields. Treat a Release lookup returning 404 as absent only after independently confirming authenticated access to the correct project; do not mistake an access problem for a missing Release. For an unsupported platform, notes or tag-only operations can still work; stop before pushing a tag as part of a full release.

Read the Release back and verify its tag, title, and exact notes. Report the version, baseline, commit, and Release URL. If the tag push succeeded but publishing failed, report that partial state and the exact version to retry; do not roll back the tag or silently start a new release.