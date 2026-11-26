# Registry Format Draft

This document defines a draft `registry.json` structure for Awesome Agent Skills.

The goal is to provide one normalized data source for:

- the website search UI
- filtering by category, type, platform, and status
- future automation such as star syncing or curated installers

## Design Goals

1. Keep data normalized and machine-friendly.
2. Separate factual metadata from presentation.
3. Distinguish "declared support" from "verified support".
4. Support different entry types:
   - single skills
   - collections of skills hosted together

All catalog entries must meet the [inclusion requirements](../CONTRIBUTING.md), including the 512-star minimum for the public source repository. Documentation and tools may be linked as references, not as entries.

## Top-Level Shape

```json
{
  "schemaVersion": 1,
  "draft": true,
  "generatedAt": "2026-03-24T00:00:00Z",
  "entries": []
}
```

## Entry Fields

Each entry should use this shape:

```json
{
  "id": "example-code-review",
  "name": "code-review",
  "slug": "code-review",
  "entryType": "single-skill",
  "category": "devtools",
  "description": {
    "en": "Smart code review example skill.",
    "zh": "智能代码审查示例 Skill。"
  },
  "links": {
    "repo": "https://github.com/JackyST0/awesome-agent-skills",
    "docs": "https://github.com/JackyST0/awesome-agent-skills/tree/main/examples/code-review"
  },
  "repo": {
    "fullName": "JackyST0/awesome-agent-skills",
    "stars": 670,
    "license": "CC0-1.0"
  },
  "platforms": [
    "cursor",
    "claude",
    "copilot",
    "windsurf",
    "codex",
    "opencode",
    "openclaw"
  ],
  "status": [
    "bundled",
    "docs-only"
  ],
  "verification": {
    "status": "docs-only",
    "verifiedPlatforms": [],
    "notes": "Listed as supported by directory compatibility, but not yet runtime-tested on every platform."
  },
  "source": {
    "kind": "bundled",
    "path": "examples/code-review"
  },
  "installation": {
    "bundledInstaller": true,
    "manualCopy": true
  },
  "tags": [
    "review",
    "example"
  ]
}
```

## Field Reference

### `id`

Stable unique identifier used by the website and any future scripts.

Recommended format:

- bundled examples: `example-<slug>`
- external repos: `<owner>-<repo>`

### `entryType`

Allowed values:

- `single-skill`
- `collection`

Bundled examples are single skills. Record their origin in `source.kind`, not `entryType`.

### `category`

The primary use case is independent of `entryType`. The README sections and search index use these IDs:

- `devtools`
- `productivity`
- `devops`
- `data`
- `writing`
- `design`

### `description`

Bilingual object:

```json
{
  "en": "English description",
  "zh": "中文描述"
}
```

This makes it easier for the site to render either language without parsing README text.

### `links`

Recommended fields:

- `repo`
- `docs`
- `homepage`
- `registry`

Only include what exists.

### `repo`

Repository metadata for GitHub-backed entries.

Recommended fields:

- `fullName`
- `stars`
- `license`

Use the repository that contains the skill files, not a related project's repository.

### `platforms`

Declared or intended support.

Allowed values:

- `cursor`
- `claude`
- `copilot`
- `windsurf`
- `codex`
- `opencode`
- `openclaw`
- `all`

Important:

- `platforms` means "this entry targets or supports these platforms"
- An em dash in a catalog row means no platform was specified. Use an empty `platforms` array in this draft, not `all`.
- it does **not** automatically mean "fully verified on every platform"

### `status`

Flat status tags for fast filtering.

Recommended values:

- `bundled`
- `verified`
- `community-tested`
- `docs-only`

Examples:

- bundled example with no runtime validation yet:
  - `["bundled", "docs-only"]`
- skill tested on its declared platform:
  - `["verified"]`

### `verification`

Use this object for trustworthy compatibility notes.

```json
{
  "status": "docs-only",
  "verifiedPlatforms": [],
  "notes": "Short explanation."
}
```

Recommended `verification.status` values:

- `verified`
- `community-tested`
- `docs-only`

This field should drive any future "Verified" badge in the UI.

### `source`

Where the entry comes from.

Examples:

```json
{ "kind": "bundled", "path": "examples/code-review" }
```

```json
{ "kind": "external", "repo": "anthropics/skills" }
```

### `installation`

Installation hints for future product work.

Recommended booleans:

- `bundledInstaller`
- `manualCopy`
- `thirdPartyManager`

These are intentionally simple so the site can show install options without knowing shell details yet.

### `tags`

Freeform low-risk keywords for search and faceting.

Examples:

- `review`
- `testing`
- `docs`
- `official`
- `openclaw`

## Guidance for Future Evolution

If this draft works well, the next step should be:

1. create a real `registry.json` from README entries
2. make `scripts/update-stars.js` read repositories from the registry instead of a hardcoded array
3. let the website filter using `entryType`, `category`, `platforms`, and `verification.status`

Keep presentation-specific data out of the registry whenever possible. For example, badge colors, card layout, and icon choices should stay in the frontend.
