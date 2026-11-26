# Awesome Agent Skills

<p align="center">
  <img src="assets/banner.svg" alt="Awesome Agent Skills" width="100%">
</p>

<p align="center">
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"></a>
  <img src="https://img.shields.io/github/stars/JackyST0/awesome-agent-skills?style=social" alt="GitHub Stars">
</p>

<p align="center">
<a href="https://jackyst0.github.io/awesome-agent-skills/">Search Skills Online</a>
</p>

> Modular instruction packages that give AI coding assistants on-demand capabilities for specific tasks, working across Cursor, Claude Code, GitHub Copilot, and more.

English | [简体中文](README_ZH.md)

This catalog lists usable Agent Skills and collections from public GitHub repositories with **at least 512 stars**. The same [inclusion criteria](CONTRIBUTING.md) apply to first-party and community skills.

## Contents

- [Quick Start](#quick-start)
- [What Are Agent Skills](#what-are-agent-skills)
- [Skills by Use Case](#skills-by-use-case)
  - [Development and Testing](#development-and-testing)
  - [Tasks and Productivity](#tasks-and-productivity)
  - [Deployment and Operations](#deployment-and-operations)
  - [Data Processing](#data-processing)
  - [Writing](#writing)
  - [Design](#design)

## Quick Start

### Quick Install (Recommended)

**macOS / Linux:**

```bash
curl --fail --proto '=https' --tlsv1.2 -fsSLo install.sh https://raw.githubusercontent.com/JackyST0/awesome-agent-skills/v1.1.0/install.sh && AAS_REPOSITORY_REF=v1.1.0 bash install.sh
```

**Windows (PowerShell):**

```powershell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/JackyST0/awesome-agent-skills/v1.1.0/install.ps1" -OutFile "install.ps1"; .\install.ps1 -RepositoryRef v1.1.0
```

The stable release reference is included directly in the copy-paste command, so no prior environment setup is required. For later commands, use forms such as `AAS_REPOSITORY_REF=v1.1.0 bash install.sh -p cursor -a` or `.\install.ps1 -RepositoryRef v1.1.0 -Platform cursor -All`. The installer also includes the stable release as its default; the environment variable and parameter remain available for reviewed overrides.

### Verify Before Running

For environments that require checksum verification:

```bash
export AAS_REF="v1.1.0"
base_url="https://raw.githubusercontent.com/JackyST0/awesome-agent-skills/$AAS_REF"
curl --fail --proto '=https' --tlsv1.2 -LO "$base_url/install.sh" -LO "$base_url/checksums.txt"
shasum -a 256 -c checksums.txt --ignore-missing
AAS_REPOSITORY_REF="$AAS_REF" bash install.sh
```

```powershell
$AAS_REF = "v1.1.0"
$baseUrl = "https://raw.githubusercontent.com/JackyST0/awesome-agent-skills/$AAS_REF"
Invoke-WebRequest -Uri "$baseUrl/install.ps1" -OutFile "install.ps1"
Invoke-WebRequest -Uri "$baseUrl/checksums.txt" -OutFile "checksums.txt"
$expected = (Select-String -Path checksums.txt -Pattern ' install\.ps1$').Line.Split()[0]
if ((Get-FileHash install.ps1 -Algorithm SHA256).Hash.ToLower() -ne $expected) { throw "SHA-256 verification failed." }
.\install.ps1 -RepositoryRef $AAS_REF
```

> Note: The installer only installs the bundled example skills from this repository's `examples/` directory. It is not a package manager for every third-party project listed below.

### Manual Install

```bash
# Clone examples from this repository
git clone https://github.com/JackyST0/awesome-agent-skills.git
cp -r awesome-agent-skills/examples/code-review ~/.cursor/skills/

# Or clone official skills
git clone https://github.com/anthropics/skills.git ~/.cursor/skills/anthropics
```

> 📖 See [How to Use Agent Skills](docs/how-to-use.md) for the guide, or the [Agent Skills specification](https://agentskills.io/specification) for the `SKILL.md` format.

## What Are Agent Skills

Agent Skills are instruction sets, scripts, and resources that AI agents can discover and use to perform specific tasks. Each skill contains a `SKILL.md` file that tells the AI how to use it.

Skills work across multiple platforms:

|Platform   |Global Directory             |Project Directory   |
|-----------|-----------------------------|--------------------|
|Cursor     |`~/.cursor/skills/`          |`.cursor/skills/`   |
|Claude Code|`~/.claude/skills/`          |`.claude/skills/`   |
|Copilot    |`~/.copilot/skills/`         |`.github/skills/`   |
|Windsurf   |`~/.codeium/windsurf/skills/`|`.devin/skills/`    |
|Codex      |`~/.codex/skills/`           |`.codex/skills/`    |
|OpenCode   |`~/.config/opencode/skills/` |`.opencode/skills/` |
|OpenClaw   |`~/.openclaw/skills/`        |`skills/`           |

## Skills by Use Case

Choose a section by what you want to do. The **Type** column distinguishes a single skill from a collection; each entry appears once.

### Development and Testing

| Name | Type | Description | Platforms | Stars | Source |
| --- | --- | --- | --- | --- | --- |
| microsoft/skills | Skills Collection | Microsoft's collection of skills for working with Azure SDKs. | Claude/Copilot/OpenCode | 3.2k | [GitHub](https://github.com/microsoft/skills) |
| GitHub Awesome Copilot | Skills Collection | Reusable skills for GitHub Copilot, with a separate directory for each skill. | Copilot | 41.5k | [GitHub](https://github.com/github/awesome-copilot/tree/main/skills) |
| SkillKit methodology packs | Skills Collection | Skills for debugging, testing, planning, and team handoffs. | — | 1.6k | [GitHub](https://github.com/rohitg00/skillkit/tree/main/packages/core/src/methodology/packs) |
| oh-my-agent | Skills Collection | 33 skills and 21 workflows kept in one `.agents/skills` folder and symlinked per skill into Claude Code, Codex, Cursor and other runtimes; `oma link --dry-run` previews what it will write. | Cursor/Claude/Codex/OpenCode | 1.5k | [GitHub](https://github.com/first-fluke/oh-my-agent) |
| addyosmani/agent-skills | Skills Collection | Production-grade engineering skills and slash-command workflows for AI coding agents. | All | 119.8k | [GitHub](https://github.com/addyosmani/agent-skills) |
| trailofbits/skills | Skills Collection | Trail of Bits security research and audit Skills. | Claude | 8.4k | [GitHub](https://github.com/trailofbits/skills) |
| playwright-skill | Single Skill | Playwright browser automation testing Skill. | Claude | 3.3k | [GitHub](https://github.com/lackeyjb/playwright-skill) |
| markstream-install | Single Skill | Install streaming Markdown renderers across Vue, React, Svelte, Angular, and Vue 2 projects. | All | 3.1k | [GitHub](https://github.com/Simon-He95/markstream-vue/tree/main/.agents/skills/markstream-install) |
| skill-codex | Single Skill | Delegate tasks to Codex Skill. | Claude | 1.5k | [GitHub](https://github.com/skills-directory/skill-codex) |
| claude-code-skills | Skills Collection | Professional Skills marketplace. | Claude | 1.5k | [GitHub](https://github.com/daymade/claude-code-skills) |
| elastic/agent-skills | Skills Collection | Official Elastic skills for Elasticsearch, Kibana, Observability, and Security workflows. | All | 613 | [GitHub](https://github.com/elastic/agent-skills) |
| vercel-labs/agent-skills | Skills Collection | Vercel React/Web design best practices Skills. | All | 34.8k | [GitHub](https://github.com/vercel-labs/agent-skills) |
| antfu/skills | Skills Collection | Vue/Vite/Vitest development Skills. | All | 6.1k | [GitHub](https://github.com/antfu/skills) |
| Supabase Agent Skills | Skills Collection | Skills for working with Supabase and PostgreSQL. | All | 3.1k | [GitHub](https://github.com/supabase/agent-skills) |
| Expo Skills | Skills Collection | Expo/React Native development Skills. | All | 4.2k | [GitHub](https://github.com/expo/skills) |
| browser-use/browser-use | Single Skill | Browser automation Skill. | All | 121.8k | [GitHub](https://github.com/browser-use/browser-use/tree/main/skills/browser-use) |
| code-review | Single Skill | Smart code review example Skill. | All | 670 | [GitHub](https://github.com/JackyST0/awesome-agent-skills/tree/main/examples/code-review) |
| git-commit | Single Skill | Git commit message generator Skill. | All | 670 | [GitHub](https://github.com/JackyST0/awesome-agent-skills/tree/main/examples/git-commit) |
| unit-test-generator | Single Skill | Unit test auto-generator Skill. | All | 670 | [GitHub](https://github.com/JackyST0/awesome-agent-skills/tree/main/examples/unit-test-generator) |
| api-doc-generator | Single Skill | API documentation generator Skill. | All | 670 | [GitHub](https://github.com/JackyST0/awesome-agent-skills/tree/main/examples/api-doc-generator) |
| debug-helper | Single Skill | Code debugging assistant Skill. | All | 670 | [GitHub](https://github.com/JackyST0/awesome-agent-skills/tree/main/examples/debug-helper) |
| birdview | Single Skill | Generate evidence-linked architecture and constraint maps, review planned change scope before implementation, and record verification results. | Claude/Codex | 704 | [GitHub](https://github.com/Qiuner/birdview) |
| task-observer | Single Skill | Watches work sessions, logs where skills fail, and turns the corrections into proposed skill improvements. | Claude | 4.0k | [GitHub](https://github.com/rebelytics/one-skill-to-rule-them-all) |
| reverse-engineer-anything | Single Skill | Inspect shipped binaries and JavaScript/Electron apps using REA CLI/MCP evidence; deep native analysis needs separately installed Hopper, Ghidra, or IDA. | Codex | 474.4k | [GitHub](https://github.com/morluto/rea/tree/main/.agents/skills/reverse-engineer-anything) |
| claude-code-workflows | Skills Collection | Production-grade dev workflows with quality checks. | Claude | 720 | [GitHub](https://github.com/shinpr/claude-code-workflows) |
| obra/superpowers | Skills Collection | Complete dev workflow (Debug/TDD/Code Review/Planning). | All | 324.3k | [GitHub](https://github.com/obra/superpowers) |
| context-engineering | Skills Collection | Context engineering and multi-Agent architecture. | All | 18.4k | [GitHub](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering) |

### Tasks and Productivity

| Name | Type | Description | Platforms | Stars | Source |
| --- | --- | --- | --- | --- | --- |
| anthropics/skills | Skills Collection | Anthropic's skills for document processing, design, and other tasks. | Claude | 199.1k | [GitHub](https://github.com/anthropics/skills) |
| ComposioHQ/awesome-claude-skills | Skills Collection | Claude Skills collection by Composio. | Cursor/Claude/Codex | 80.1k | [GitHub](https://github.com/ComposioHQ/awesome-claude-skills) |
| best-skills | Skills Collection | High-quality Skills collection for paper writing, dev workflow, and content creation. | Cursor/Claude/Codex/OpenClaw | 3.2k | [GitHub](https://github.com/xstongxue/best-skills) |
| Skill Factory collection | Skills Collection | Ready-to-use skills for AWS architecture, app store optimization, and other workflows. | Claude | 912 | [GitHub](https://github.com/alirezarezvani/claude-code-skill-factory/tree/dev/generated-skills) |
| sno-station-skills | Skills Collection | Skills for Claude Code and Codex: cross-vendor peer review, handoff when one agent hits its usage limit, delegation and reporting. | Cursor/Claude/Codex/OpenClaw | 871 | [GitHub](https://github.com/sno-ai/sno-station-skills) |
| laolaoshiren/claude-code-skills-zh | Skills Collection | Curated Claude Code skills collection for Chinese developers, with 438+ curated skills and 20 original skills. | Cursor/Claude/Codex | 927 | [GitHub](https://github.com/laolaoshiren/claude-code-skills-zh) |
| nexscope-ai/eCommerce-Skills | Skills Collection | E-commerce skills for AI agents covering product research, marketing, and operations across Amazon, Shopify, TikTok Shop, and more. | All | 1.5k | [GitHub](https://github.com/nexscope-ai/eCommerce-Skills) |
| nexscope-ai/Amazon-Skills | Skills Collection | Free Amazon seller skills for keyword research, competitor analysis, listing audits, and more. | All | 886 | [GitHub](https://github.com/nexscope-ai/Amazon-Skills) |
| alirezarezvani/claude-skills | Skills Collection | 20+ productivity tools with 8 expert Agents. | Claude | 30.3k | [GitHub](https://github.com/alirezarezvani/claude-skills) |
| planning-with-files | Single Skill | Persistent file-based planning with task plans, findings, progress tracking, and session recovery for long-running agent work. | All | 28.2k | [GitHub](https://github.com/OthmanAdi/planning-with-files) |
| coreyhaines31/marketingskills | Skills Collection | Marketing Skills (SEO/Copywriting/CRO/Ads). | All | 62.1k | [GitHub](https://github.com/coreyhaines31/marketingskills) |
| changelog-generator | Single Skill | Generate changelogs from Git commits. | Claude | 80.1k | [GitHub](https://github.com/ComposioHQ/awesome-claude-skills/tree/master/changelog-generator) |
| new-term-radar | Skills Collection | Spots new AI model, product and repo names on X, Hugging Face, GitHub and sitemaps, then ranks the search terms behind them by Google Ads volume and DataForSEO Trends (an estimate of Google search interest). Three skills and an MCP server; needs an AIsa API key, and an optional GoAnyAPI key adds Google Trends related queries and country-level trend series. | All | 2.2k | [GitHub](https://github.com/zhuyansen/new-term-radar) |
| answer-me-with-html | Single Skill | Agent skill that writes the answer as a Markdown draft and renders one offline HTML page, using about 1/8 of the output tokens. | Cursor/Claude/Codex/OpenCode | 6.6k | [GitHub](https://github.com/QingYunA/answer-me-with-html) |
| career-ops | Single Skill | Open-source AI job search agent for Claude Code, Codex and OpenCode: scans company career pages, scores each job posting 1-5 against your CV, tailors an ATS-friendly resume and tracks applications; you submit every application yourself. No telemetry; your CV goes only to the AI provider you choose. [Website](https://career-ops.org) | Claude/Codex/OpenCode | 84.3k | [GitHub](https://github.com/career-ops-hq/career-ops) |
| last30days | Single Skill | Researches any topic across Reddit, X, YouTube, TikTok, Hacker News, Polymarket, GitHub, and the web from the last 30 days, ranks results by real engagement (upvotes, likes, prediction-market odds), and writes one cited brief. Reddit, Hacker News, Polymarket and GitHub need no setup. | All | 72.7k | [GitHub](https://github.com/mvanhorn/last30days-skill) |

### Deployment and Operations

| Name | Type | Description | Platforms | Stars | Source |
| --- | --- | --- | --- | --- | --- |
| microsoft/azure-skills | Skills Collection | Skills for provisioning, troubleshooting, and operating Azure services. | Cursor/Claude/Copilot/Codex/OpenCode | 1.7k | [GitHub](https://github.com/microsoft/azure-skills) |
| claudekit-skills | Skills Collection | Docker/GCP/Cloudflare deployment and management. | Claude | 2.2k | [GitHub](https://github.com/mrgoonie/claudekit-skills) |

### Data Processing

| Name | Type | Description | Platforms | Stars | Source |
| --- | --- | --- | --- | --- | --- |
| youtube-skills | Skills Collection | YouTube transcript, video search, channel and playlist skills for Claude Code, OpenClaw, Hermes Agent, and other agent runtimes. | Cursor/Claude/Codex/OpenClaw | 1.2k | [GitHub](https://github.com/ZeroPointRepo/youtube-skills) |
| kordoc | Single Skill | Korean document (HWP/HWPX/PDF) to Markdown conversion, form filling, and HWPX generation Skill. | Claude | 3.1k | [GitHub](https://github.com/chrisryugj/kordoc/tree/main/plugins/kordoc/skills/kordoc) |
| jiangshan-atlas | Single Skill | Interactive Chinese historical atlas Skill for locating ancient places, classical poems, and figure trajectories. | All | 8.9k | [GitHub](https://github.com/DeanChensj/jiangshan-map/tree/main/skills/jiangshan-atlas) |
| ava | Single Skill | Analyze files and databases, reuse business definitions, verify calculations, and generate interactive charts. | Claude/Codex | 1.7k | [GitHub](https://github.com/antvis/AVA/tree/ai/skills/ava) |

### Writing

| Name | Type | Description | Platforms | Stars | Source |
| --- | --- | --- | --- | --- | --- |
| doc-coauthoring | Single Skill | Document co-authoring Skill. | Claude | 199.1k | [GitHub](https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring) |
| internal-comms | Single Skill | Internal communications generation Skill. | Claude | 199.1k | [GitHub](https://github.com/anthropics/skills/tree/main/skills/internal-comms) |
| docx | Single Skill | Word document processing Skill. | Claude | 199.1k | [GitHub](https://github.com/anthropics/skills/tree/main/skills/docx) |
| pdf | Single Skill | Portable document format processing Skill. | Claude | 199.1k | [GitHub](https://github.com/anthropics/skills/tree/main/skills/pdf) |
| pptx | Single Skill | PowerPoint presentation generator Skill. | Claude | 199.1k | [GitHub](https://github.com/anthropics/skills/tree/main/skills/pptx) |
| xlsx | Single Skill | Excel spreadsheet processing Skill. | Claude | 199.1k | [GitHub](https://github.com/anthropics/skills/tree/main/skills/xlsx) |

### Design

| Name | Type | Description | Platforms | Stars | Source |
| --- | --- | --- | --- | --- | --- |
| frontend-design | Single Skill | Frontend UI design Skill. | Claude | 199.1k | [GitHub](https://github.com/anthropics/skills/tree/main/skills/frontend-design) |
| brand-guidelines | Single Skill | Brand design guidelines Skill. | Claude | 199.1k | [GitHub](https://github.com/anthropics/skills/tree/main/skills/brand-guidelines) |
| canvas-design | Single Skill | Canvas design Skill. | Claude | 199.1k | [GitHub](https://github.com/anthropics/skills/tree/main/skills/canvas-design) |
| theme-factory | Single Skill | Theme style factory Skill. | Claude | 199.1k | [GitHub](https://github.com/anthropics/skills/tree/main/skills/theme-factory) |
| algorithmic-art | Single Skill | Algorithmic art generation Skill. | Claude | 199.1k | [GitHub](https://github.com/anthropics/skills/tree/main/skills/algorithmic-art) |
| slack-gif-creator | Single Skill | Slack GIF creator Skill. | Claude | 199.1k | [GitHub](https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator) |

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## Footnotes

### Create Your Own Skill

📁 **Examples**: Check out [examples/](examples/) for 5 ready-to-use skill templates.

📖 **Guide**: See [How to Create a Skill](docs/how-to-create.md) for the complete guide.

📋 **Specification**: See [SKILL.md Specification](docs/skill-spec.md) for format standards and best practices.

### Support

If this project helps you, you can support its maintenance:

<details>
<summary>Show support options</summary>

Sponsorship does not affect listing decisions. All submissions are reviewed using the same contribution criteria.

PayPal: [paypal.me/JackyST0](https://paypal.me/JackyST0)

</details>

### Star History

[![Star History Chart](https://star-history.dera.page/svg?repos=JackyST0/awesome-agent-skills&type=Date)](https://star-history.dera.page/#JackyST0/awesome-agent-skills&Date)
