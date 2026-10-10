# Awesome Agent Skills

<p align="center">
  <img src="assets/banner.svg" alt="Awesome Agent Skills" width="100%">
</p>

<p align="center">
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"></a>
  <img src="https://img.shields.io/github/stars/JackyST0/awesome-agent-skills?style=social" alt="GitHub Stars">
</p>

<p align="center">
  <a href="https://jackyst0.github.io/awesome-agent-skills/"><b>🔍 Search Skills Online</b></a>
</p>

> Modular instruction packages that give AI coding assistants on-demand capabilities for specific tasks, working across Cursor, Claude Code, GitHub Copilot, and more.

English | [简体中文](README_ZH.md)

## Contents

- [Quick Start](#quick-start)
- [What Are Agent Skills](#what-are-agent-skills)
- [Official Resources](#official-resources)
- [Skills Collections](#skills-collections)
- [Development Tools](#development-tools)
- [Productivity](#productivity)
- [DevOps](#devops)
- [Data Processing](#data-processing)
- [Writing](#writing)
- [Design](#design)

## Quick Start

### Quick Install (Recommended)

**macOS / Linux:**

```bash
curl --fail --proto '=https' --tlsv1.2 -fsSLo install.sh https://raw.githubusercontent.com/JackyST0/awesome-agent-skills/v1.0.1/install.sh && AAS_REPOSITORY_REF=v1.0.1 bash install.sh
```

**Windows (PowerShell):**

```powershell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/JackyST0/awesome-agent-skills/v1.0.1/install.ps1" -OutFile "install.ps1"; .\install.ps1 -RepositoryRef v1.0.1
```

The stable release reference is included directly in the copy-paste command, so no prior environment setup is required. For later commands, use forms such as `AAS_REPOSITORY_REF=v1.0.1 bash install.sh -p cursor -a` or `.\install.ps1 -RepositoryRef v1.0.1 -Platform cursor -All`. The installer also includes the stable release as its default; the environment variable and parameter remain available for reviewed overrides.

### Verify Before Running

For environments that require checksum verification:

```bash
export AAS_REF="v1.0.1"
base_url="https://raw.githubusercontent.com/JackyST0/awesome-agent-skills/$AAS_REF"
curl --fail --proto '=https' --tlsv1.2 -LO "$base_url/install.sh" -LO "$base_url/checksums.txt"
shasum -a 256 -c checksums.txt --ignore-missing
AAS_REPOSITORY_REF="$AAS_REF" bash install.sh
```

```powershell
$AAS_REF = "v1.0.1"
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

> 📖 See [How to Use Agent Skills](docs/how-to-use.md) for the complete guide.

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

## Official Resources

- [Agent Skills Open Standard](https://skill.md/) - Official Agent Skills specification.
- [Agent Skills Specification](https://agentskills.io/specification) - SKILL.md format specification.
- [agentskills/agentskills](https://github.com/agentskills/agentskills) - Official Agent Skills specification and documentation repository.
- [anthropics/skills](https://github.com/anthropics/skills) - Official Anthropic Agent Skills repository.
- [GitHub Docs: About agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills) - GitHub official overview of agent skills, supported hosts, and `gh skill`.
- [GitHub Docs: Adding agent skills for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/add-skills) - GitHub official guide for creating, installing, and publishing agent skills.
- [GitHub CLI: gh skill](https://cli.github.com/manual/gh_skill) - Official GitHub CLI commands for discovering, installing, updating, and publishing Agent Skills.
- [VS Code Docs: Use Agent Skills in VS Code](https://code.visualstudio.com/docs/copilot/customization/agent-skills) - Official VS Code guide for using Agent Skills with GitHub Copilot.
- [vercel-labs/skills](https://github.com/vercel-labs/add-skill) - Vercel official Skills CLI tool.
- [microsoft/skills](https://github.com/microsoft/agent-skills) - Microsoft official 131 Azure SDK Skills.
- [microsoft/azure-skills](https://github.com/microsoft/azure-skills) - Official Azure skills plugin with MCP server configurations and 20 curated Azure skills.
- [OpenAI Codex: Agent Skills](https://developers.openai.com/codex/skills/) - OpenAI official guide for using Agent Skills in Codex CLI, IDE extension, and Codex app.
- [GitHub Awesome Copilot](https://github.com/github/awesome-copilot) - Official Copilot resources collection.
- [Agent Skills Index](https://agent-skills.md/) - Community Skills search engine.
- [Skills Leaderboard](https://skills.sh) - Open Agent Skills ecosystem directory.
- [Tencent SkillHub](https://skillhub.tencent.com/) - Tencent's Skills community with 13k+ skills, optimized for Chinese users.
- [ClawHub](https://docs.openclaw.ai/skills) - OpenClaw's public skills registry for discovering and sharing skills.

## Skills Collections

- [awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) - The most comprehensive Cursor Rules collection.
- [everything-claude-code](https://github.com/affaan-m/everything-claude-code) - Complete Claude Code configs (agents/skills/hooks).
- [heilcheng/awesome-agent-skills](https://github.com/heilcheng/awesome-agent-skills) - Community-curated Agent Skills directory focused on real-world skills used by engineering teams.
- [mblode/agent-skills](https://github.com/mblode/agent-skills) - Open-source agent skills for UI audits, typography, documentation, PR review, and releases.
- [kasetto](https://github.com/pivoshenko/kasetto) - An extremely fast AI skills manager, written in Rust.
- [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) - Claude Skills collection by Composio.
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) - Claude Code skills/hooks/plugins collection.
- [openskills](https://github.com/numman-ali/openskills) - Universal Skills loader (npm install).
- [VoltAgent/awesome-claude-skills](https://github.com/VoltAgent/awesome-claude-skills) - Claude Skills collection by VoltAgent.
- [simonw/claude-skills](https://github.com/simonw/claude-skills) - Claude Skills documentation by Simon Willison.
- [claude-skills-collection](https://github.com/abubakarsiddik31/claude-skills-collection) - Curated official and community Skills.
- [cursor-rules-and-prompts](https://github.com/thehimel/cursor-rules-and-prompts) - Cursor rules and prompts collection.
- [Ai-Agent-Skills](https://github.com/skillcreatorai/Ai-Agent-Skills) - Universal AI Skills installer (Homebrew for Skills).
- [claude-code-kit](https://github.com/blencorp/claude-code-kit) - Claude Code toolkit with auto-activating skills.
- [best-skills](https://github.com/xstongxue/best-skills) - High-quality Skills collection for paper writing, dev workflow, and content creation.
- [skillkit](https://github.com/rohitg00/skillkit) - Cross-platform skills manager that installs, translates, and syncs skills across 40+ agents.
- [OrkasVideoStudio](https://github.com/Orkas-AI/Orkas-VideoStudio) - Agent video-production skill pack with CLI and MCP runtime.
- [Skywork-Skills](https://github.com/SkyworkAI/Skywork-Skills) - Officially maintained Skywork agent skills for AI office workflows, including PPT, documents, Excel, design, search, and music.
- [suede-creator-skills](https://github.com/JasonColapietro/suede-creator-skills) - Skills pack for Claude Code and Codex covering code review and grading, design, marketing and SEO, agent workflows, and mobile app shipping.
- [unifapi-agent/skills](https://github.com/unifapi-agent/skills) - Public-data MCP and KOL pricing Skills for Codex, Claude Code, Cursor, and other agents.
- [youtube-skills](https://github.com/ZeroPointRepo/youtube-skills) - YouTube transcript, video search, channel and playlist skills for Claude Code, OpenClaw, Hermes Agent, and other agent runtimes.
- [tonone](https://github.com/tonone-ai/tonone) - Claude Code plugin with 100 specialist agents and 429 skills across engineering, product, design, security, legal, and ops; a SessionStart hook loads only the skills relevant to the current repo.

## Development Tools

- [agenttrace-session-audit](https://github.com/luoyuctl/agenttrace/blob/master/skills/agenttrace-session-audit/SKILL.md) - Audit local AI coding-agent session health, cost, failures, and diffs.
- [orca-replay](https://github.com/Continuum-AI-Corp/OrcaReplay/tree/main/skills/orca-replay) - Read a recorded agent run from its trace: what it actually sent, ran and changed. Replay is offline for the model only — the recorded shell commands re-execute for real and `worktree` isolation is not a sandbox, so the skill requires checking side effects first.
- [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) - Production-grade engineering skills and slash-command workflows for AI coding agents.
- [claude-code-security-review](https://github.com/anthropics/claude-code-security-review) - AI security review GitHub Action (Official).
- [trailofbits/skills](https://github.com/trailofbits/skills) - Trail of Bits security research and audit Skills.
- [playwright-skill](https://github.com/lackeyjb/playwright-skill) - Playwright browser automation testing Skill.
- [markstream-install](https://github.com/Simon-He95/markstream-vue/tree/main/.agents/skills/markstream-install) - Install streaming Markdown renderers across Vue, React, Svelte, Angular, and Vue 2 projects.
- [skill-codex](https://github.com/skills-directory/skill-codex) - Delegate tasks to Codex Skill.
- [claude-code-skills](https://github.com/daymade/claude-code-skills) - Professional Skills marketplace.
- [skillset-example](https://github.com/copilot-extensions/skillset-example) - GitHub Copilot extension example.
- [elastic/agent-skills](https://github.com/elastic/agent-skills) - Official Elastic skills for Elasticsearch, Kibana, Observability, and Security workflows.
- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) - Vercel React/Web design best practices Skills.
- [antfu/skills](https://github.com/antfu/skills) - Vue/Vite/Vitest development Skills.
- [Supabase Agent Skills](https://github.com/supabase/agent-skills) - PostgreSQL best practices Skill by Supabase.
- [Prisma Agent Skills](https://github.com/prisma/skills) - Prisma Postgres, Prisma ORM and Prisma Compute Skills by Prisma.
- [Expo Skills](https://github.com/expo/skills) - Expo/React Native development Skills.
- [browser-use/browser-use](https://github.com/browser-use/browser-use) - Browser automation Skill.
- [Xquik x-twitter-scraper](https://github.com/Xquik-dev/x-twitter-scraper) - X (Twitter) data Skill with REST endpoints, MCP tools, webhooks, SDKs, and automation workflows.
- [code-review](https://github.com/JackyST0/awesome-agent-skills/tree/main/examples/code-review) - Smart code review example Skill.
- [git-commit](https://github.com/JackyST0/awesome-agent-skills/tree/main/examples/git-commit) - Git commit message generator Skill.
- [unit-test-generator](https://github.com/JackyST0/awesome-agent-skills/tree/main/examples/unit-test-generator) - Unit test auto-generator Skill.
- [api-doc-generator](https://github.com/JackyST0/awesome-agent-skills/tree/main/examples/api-doc-generator) - API documentation generator Skill.
- [debug-helper](https://github.com/JackyST0/awesome-agent-skills/tree/main/examples/debug-helper) - Code debugging assistant Skill.
- [authsome](https://github.com/agentrhq/authsome) - Local credential broker for AI agents with encrypted local vault storage and proxy-based credential injection.
- [Sverklo](https://github.com/sverklo/sverklo) - Local-first repo-memory MCP for coding agents: proof receipts, symbol refs, impact, and diff review.
- [birdview](https://github.com/Qiuner/birdview) - Generate evidence-linked architecture and constraint maps, review planned change scope before implementation, and record verification results.
- [task-observer](https://github.com/rebelytics/one-skill-to-rule-them-all) - Watches work sessions, logs where skills fail, and turns the corrections into proposed skill improvements.
- [check-skill](https://github.com/UiPath/coder_eval/tree/main/plugins/coder-eval/skills/check-skill) - Measures whether a Claude Code skill triggers: generates a labelled activation suite and reports precision and recall.
- [assay](https://github.com/awss1i/assay/tree/main/plugins/assay/skills/checking-a-page) - Opens a web page in a real browser, drives every control, and reports where the page breaks or contradicts itself. Deterministic, with no tests to write and no LLM.
- [reverse-engineer-anything](https://github.com/morluto/rea/tree/main/skill-src/reverse-engineer-anything) - Inspect shipped binaries and JavaScript/Electron apps using REA CLI/MCP evidence; deep native analysis needs separately installed Hopper, Ghidra, or IDA.
- [supercov](https://github.com/supercorp-ai/supercov/tree/main/plugins/supercov/skills/supercov) - Measures line, branch and MC/DC coverage of the existing tests and hands the agent the untested code to test next. Coverage runs locally; the optional quality analysis sends source files to TypeSafe when `TYPESAFE_API_KEY` is configured.

## Productivity

- [claude-code-workflows](https://github.com/shinpr/claude-code-workflows) - Production-grade dev workflows with quality checks.
- [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) - 20+ productivity tools with 8 expert Agents.
- [claude-code-skill-factory](https://github.com/alirezarezvani/claude-code-skill-factory) - Skills factory for batch generation and deployment.
- [obra/superpowers](https://github.com/obra/superpowers) - Complete dev workflow (Debug/TDD/Code Review/Planning).
- [planning-with-files](https://github.com/OthmanAdi/planning-with-files) - Persistent file-based planning with task plans, findings, progress tracking, and session recovery for long-running agent work.
- [cognyai/claude-code-marketing-skills](https://github.com/cognyai/claude-code-marketing-skills) - AI marketing skills (SEO Audit/Landing Page Review/Competitor Analysis/Ad Copywriting/Lead Qualification) with MCP server integration.
- [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) - Marketing Skills (SEO/Copywriting/CRO/Ads).
- [nowork-studio/NotFair](https://github.com/nowork-studio/NotFair) - Claude Code skills for SEO, GEO, Google Ads, and Meta Ads; connects to live data via Google Ads MCP, Meta Ads MCP, Google Search Console MCP, and Google Analytics (GA4) MCP.
- [gingiris-launch](https://github.com/Gingiris/gingiris-launch) - Product Hunt launch playbook for AI products, startups, and open source GTM.
- [gingiris-opensource](https://github.com/Gingiris/gingiris-opensource) - Open source marketing playbook focused on GitHub growth and launch strategy.
- [gingiris-b2b-growth](https://github.com/Gingiris/gingiris-b2b-growth) - B2B SaaS growth playbook covering PLG, SLG, and go-to-market strategy.
- [alpha-insights](https://github.com/Ericyoung-183/alpha-insights) - Harness-enforced business research skill with consulting frameworks, evidence grading, stage gates, and HTML reports.
- [salespeak-ai/buyer-eval-skill](https://github.com/salespeak-ai/buyer-eval-skill) - B2B vendor evaluation skill: 7-dimension scoring and evidence-tracked scorecards for procurement and build-vs-buy decisions.
- [changelog-generator](https://github.com/ComposioHQ/awesome-claude-skills/tree/master/changelog-generator) - Generate changelogs from Git commits.
- [wiki](https://github.com/plasma-ai/wiki/blob/main/wiki/skills/wiki/SKILL.md) - Build indexed Markdown knowledge bases that agents map, search, read, update, and lint.
- [job-application-agent](https://github.com/vaibhavarora14/job-application-agent) - Skill + CLI to discover, qualify, complete, and track your own job applications. [Data sharing](https://github.com/vaibhavarora14/job-application-agent/blob/main/job-application-agent/references/ANALYTICS.md): usage analytics and name/email sharing with private PostHog analytics, plus community-registry sharing of confirmed-application and discovery-source metadata, are enabled by default (opt-out). Optional [cloud mode](https://github.com/vaibhavarora14/job-application-agent/blob/main/job-application-agent/references/CLOUD_STATE.md) stores and syncs profile, résumé, application, and outcome state.
- [universal-exam-cram-coach](https://github.com/ZeKaiNie/universal-examprep-skill) - Exam-prep tutor that teaches from your own slides, notes and past papers with page citations, figure crops, homework-only quizzes and cross-session progress.
- [tlgr](https://github.com/tlgrcli/tlgr/tree/main/plugin/skills/tlgr) - Read, search and send Telegram messages from your own account and manage chats and contacts through the tlgr CLI, with JSON output.

## DevOps

- [devops-claude-skills](https://github.com/ahmedasmar/devops-claude-skills) - DevOps workflow marketplace with Terraform/K8s.
- [devops-engineer](https://claude-plugins.dev/skills/@Jeffallan/claude-skills/devops-engineer) - DevOps engineer Skill for cloud infrastructure management.
- [ci-cd](https://claude-plugins.dev/skills/@ahmedasmar/devops-claude-skills/ci-cd) - Design, optimize, and security-scan CI/CD pipelines.
- [claudekit-skills](https://github.com/mrgoonie/claudekit-skills) - Docker/GCP/Cloudflare deployment and management.
- [d1v](https://github.com/d1vai/d1v-cli/blob/main/skills/d1v/SKILL.md) - Deploy web projects with verified previews and explicit-confirmation production releases.

## Data Processing

- [d3-visualization](https://github.com/chrisvoncsefalvay/claude-d3js-skill) - D3.js data visualization Skill.
- [context-engineering](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering) - Context engineering and multi-Agent architecture.

## Writing

- [doc-coauthoring](https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring) - Document co-authoring Skill.
- [internal-comms](https://github.com/anthropics/skills/tree/main/skills/internal-comms) - Internal communications generation Skill.
- [docx](https://github.com/anthropics/skills/tree/main/skills/docx) - Word document processing Skill.
- [pdf](https://github.com/anthropics/skills/tree/main/skills/pdf) - Portable document format processing Skill.
- [pptx](https://github.com/anthropics/skills/tree/main/skills/pptx) - PowerPoint presentation generator Skill.
- [xlsx](https://github.com/anthropics/skills/tree/main/skills/xlsx) - Excel spreadsheet processing Skill.

## Design

- [frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) - Frontend UI design Skill.
- [brand-guidelines](https://github.com/anthropics/skills/tree/main/skills/brand-guidelines) - Brand design guidelines Skill.
- [canvas-design](https://github.com/anthropics/skills/tree/main/skills/canvas-design) - Canvas design Skill.
- [theme-factory](https://github.com/anthropics/skills/tree/main/skills/theme-factory) - Theme style factory Skill.
- [algorithmic-art](https://github.com/anthropics/skills/tree/main/skills/algorithmic-art) - Algorithmic art generation Skill.
- [slack-gif-creator](https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator) - Slack GIF creator Skill.

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
