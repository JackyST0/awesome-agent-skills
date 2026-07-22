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

### One-Click Install (Recommended)

**macOS / Linux:**

```bash
# Interactive mode - install, uninstall, or list
curl -sL https://raw.githubusercontent.com/JackyST0/awesome-agent-skills/main/install.sh | bash

# Or install all skills to a specific platform
curl -sL https://raw.githubusercontent.com/JackyST0/awesome-agent-skills/main/install.sh | bash -s -- -p cursor -a
```

**Windows (PowerShell):**

```powershell
# Download and run the install script
irm https://raw.githubusercontent.com/JackyST0/awesome-agent-skills/main/install.ps1 | iex
```

> Note: The installer currently installs the bundled example skills from this repository's `examples/` directory. It is not a general-purpose package manager for every third-party project listed below.

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
|Windsurf   |`~/.windsurf/skills/`        |`.windsurf/skills/` |
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
- [kasetto](https://github.com/pivoshenko/kasetto) - An extremely fast AI skills manager, written in Rust.
- [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) - Claude Skills collection by Composio.
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) - Claude Code skills/hooks/plugins collection.
- [openskills](https://github.com/numman-ali/openskills) - Universal Skills loader (npm install).
- [awesome-claude-skills](https://github.com/VoltAgent/awesome-claude-skills) - Claude Skills collection by VoltAgent.
- [claude-skills](https://github.com/simonw/claude-skills) - Claude Skills documentation by Simon Willison.
- [claude-skills-collection](https://github.com/abubakarsiddik31/claude-skills-collection) - Curated official and community Skills.
- [cursor-rules-and-prompts](https://github.com/thehimel/cursor-rules-and-prompts) - Cursor rules and prompts collection.
- [Ai-Agent-Skills](https://github.com/skillcreatorai/Ai-Agent-Skills) - Universal AI Skills installer (Homebrew for Skills).
- [claude-code-kit](https://github.com/blencorp/claude-code-kit) - Claude Code toolkit with auto-activating skills.
- [best-skills](https://github.com/xstongxue/best-skills) - High-quality Skills collection for paper writing, dev workflow, and content creation.
- [skillkit](https://github.com/rohitg00/skillkit) - Cross-platform skills manager that installs, translates, and syncs skills across 40+ agents.
- [Skywork-Skills](https://github.com/SkyworkAI/Skywork-Skills) - Officially maintained Skywork agent skills for AI office workflows, including PPT, documents, Excel, design, search, and music.
- [unifapi-agent/skills](https://github.com/unifapi-agent/skills) - Public-data MCP and KOL pricing Skills for Codex, Claude Code, Cursor, and other agents.
- - [zhuangxiu-skills (装修避坑 Skill 合集)](https://github.com/zx029w/zhuangxiu-skills) - 12 Chinese home-renovation pitfall-avoidance skills covering customization, old-house remodel, contract/quote review, eco, workflow, first-aid, Q&A, extra-charge, company choice and budget calculator.

## Development Tools

- [agenttrace-session-audit](https://github.com/luoyuctl/agenttrace/blob/master/skills/agenttrace-session-audit/SKILL.md) - Audit local AI coding-agent session health, cost, failures, and diffs.
- [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) - Production-grade engineering skills and slash-command workflows for AI coding agents.
- [claude-code-security-review](https://github.com/anthropics/claude-code-security-review) - AI security review GitHub Action (Official).
- [trailofbits/skills](https://github.com/trailofbits/skills) - Trail of Bits security research and audit Skills.
- [playwright-skill](https://github.com/lackeyjb/playwright-skill) - Playwright browser automation testing Skill.
- [gh-code-review](https://github.com/bkircher/skills) - PR code review Skill for GitHub.
- [skill-codex](https://github.com/skills-directory/skill-codex) - Delegate tasks to Codex Skill.
- [claude-code-skills](https://github.com/daymade/claude-code-skills) - Professional Skills marketplace.
- [skillset-example](https://github.com/copilot-extensions/skillset-example) - GitHub Copilot extension example.
- [elastic/agent-skills](https://github.com/elastic/agent-skills) - Official Elastic skills for Elasticsearch, Kibana, Observability, and Security workflows.
- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) - Vercel React/Web design best practices Skills.
- [antfu/skills](https://github.com/antfu/skills) - Vue/Vite/Vitest development Skills.
- [Supabase Agent Skills](https://github.com/supabase/agent-skills) - PostgreSQL best practices Skill by Supabase.
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

## Productivity

- [claude-code-workflows](https://github.com/shinpr/claude-code-workflows) - Production-grade dev workflows with quality checks.
- [claude-skills](https://github.com/alirezarezvani/claude-skills) - 20+ productivity tools with 8 expert Agents.
- [claude-code-skill-factory](https://github.com/alirezarezvani/claude-code-skill-factory) - Skills factory for batch generation and deployment.
- [obra/superpowers](https://github.com/obra/superpowers) - Complete dev workflow (Debug/TDD/Code Review/Planning).
- [cognyai/claude-code-marketing-skills](https://github.com/cognyai/claude-code-marketing-skills) - AI marketing skills (SEO Audit/Landing Page Review/Competitor Analysis/Ad Copywriting/Lead Qualification) with MCP server integration.
- [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) - Marketing Skills (SEO/Copywriting/CRO/Ads).
- [nowork-studio/NotFair](https://github.com/nowork-studio/NotFair) - Claude Code skills for SEO, GEO, Google Ads, and Meta Ads; connects to live data via Google Ads MCP, Meta Ads MCP, Google Search Console MCP, and Google Analytics (GA4) MCP.
- [gingiris-launch](https://github.com/Gingiris/gingiris-launch) - Product Hunt launch playbook for AI products, startups, and open source GTM.
- [gingiris-opensource](https://github.com/Gingiris/gingiris-opensource) - Open source marketing playbook focused on GitHub growth and launch strategy.
- [gingiris-b2b-growth](https://github.com/Gingiris/gingiris-b2b-growth) - B2B SaaS growth playbook covering PLG, SLG, and go-to-market strategy.
- [gingiris-aso-growth](https://github.com/Gingiris/gingiris-aso-growth) - ASO and mobile app growth playbook for cold start, UGC, and distribution.
- [alpha-insights](https://github.com/Ericyoung-183/alpha-insights) - Harness-enforced business research skill with consulting frameworks, evidence grading, stage gates, and HTML reports.
- [salespeak-ai/buyer-eval-skill](https://github.com/salespeak-ai/buyer-eval-skill) - B2B vendor evaluation skill: 7-dimension scoring and evidence-tracked scorecards for procurement and build-vs-buy decisions.

## DevOps

- [devops-claude-skills](https://github.com/ahmedasmar/devops-claude-skills) - DevOps workflow marketplace with Terraform/K8s.
- [claudekit-skills](https://github.com/mrgoonie/claudekit-skills) - Docker/GCP/Cloudflare deployment and management.
- [claudebox](https://github.com/RchGrav/claudebox) - Dockerized Claude Code dev environment.

## Data Processing

- [bilig-workpaper](https://github.com/proompteng/bilig/tree/main/skills/bilig-workpaper) - Formula-backed WorkPaper skill for editing cells, recalculating, verifying readback, and persisting spreadsheet logic from agents.
- [d3-visualization](https://github.com/ComposioHQ/awesome-claude-skills#data-visualization) - D3.js data visualization Skill.
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

[![Star History Chart](https://api.star-history.com/svg?repos=JackyST0/awesome-agent-skills&type=Date)](https://star-history.com/#JackyST0/awesome-agent-skills&Date)
