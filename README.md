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
- [heilcheng/awesome-agent-skills](https://github.com/heilcheng/awesome-agent-skills) - Community-curated Agent Skills directory focused on real-world skills used by engineering teams.
- [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) - Claude Skills collection by Composio.
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) - Claude Code skills/hooks/plugins collection.
- [openskills](https://github.com/numman-ali/openskills) - Universal Skills loader (npm install).
- [simonw/claude-skills](https://github.com/simonw/claude-skills) - Claude Skills documentation by Simon Willison.
- [claude-skills-collection](https://github.com/abubakarsiddik31/claude-skills-collection) - Curated official and community Skills.
- [best-skills](https://github.com/xstongxue/best-skills) - High-quality Skills collection for paper writing, dev workflow, and content creation.
- [skillkit](https://github.com/rohitg00/skillkit) - Cross-platform skills manager that installs, translates, and syncs skills across 40+ agents.
- [OrkasVideoStudio](https://github.com/Orkas-AI/Orkas-VideoStudio) - Agent video-production skill pack with CLI and MCP runtime.
- [youtube-skills](https://github.com/ZeroPointRepo/youtube-skills) - YouTube transcript, video search, channel and playlist skills for Claude Code, OpenClaw, Hermes Agent, and other agent runtimes.
- [oh-my-agent](https://github.com/first-fluke/oh-my-agent) - 33 skills and 21 workflows kept in one `.agents/skills` folder and symlinked per skill into Claude Code, Codex, Cursor and other runtimes; `oma link --dry-run` previews what it will write.
- [sno-station-skills](https://github.com/sno-ai/sno-station-skills) - Skills for Claude Code and Codex: cross-vendor peer review, handoff when one agent hits its usage limit, delegation and reporting.

## Development Tools

- [orca-replay](https://github.com/Continuum-AI-Corp/OrcaReplay/tree/main/skills/orca-replay) - Read a recorded agent run from its trace: what it actually sent, ran and changed. Replay is offline for the model only — the recorded shell commands re-execute for real and `worktree` isolation is not a sandbox, so the skill requires checking side effects first.
- [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) - Production-grade engineering skills and slash-command workflows for AI coding agents.
- [claude-code-security-review](https://github.com/anthropics/claude-code-security-review) - AI security review GitHub Action (Official).
- [trailofbits/skills](https://github.com/trailofbits/skills) - Trail of Bits security research and audit Skills.
- [playwright-skill](https://github.com/lackeyjb/playwright-skill) - Playwright browser automation testing Skill.
- [markstream-install](https://github.com/Simon-He95/markstream-vue/tree/main/.agents/skills/markstream-install) - Install streaming Markdown renderers across Vue, React, Svelte, Angular, and Vue 2 projects.
- [skill-codex](https://github.com/skills-directory/skill-codex) - Delegate tasks to Codex Skill.
- [claude-code-skills](https://github.com/daymade/claude-code-skills) - Professional Skills marketplace.
- [elastic/agent-skills](https://github.com/elastic/agent-skills) - Official Elastic skills for Elasticsearch, Kibana, Observability, and Security workflows.
- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) - Vercel React/Web design best practices Skills.
- [antfu/skills](https://github.com/antfu/skills) - Vue/Vite/Vitest development Skills.
- [Supabase Agent Skills](https://github.com/supabase/agent-skills) - PostgreSQL best practices Skill by Supabase.
- [Expo Skills](https://github.com/expo/skills) - Expo/React Native development Skills.
- [browser-use/browser-use](https://github.com/browser-use/browser-use) - Browser automation Skill.
- [code-review](https://github.com/JackyST0/awesome-agent-skills/tree/main/examples/code-review) - Smart code review example Skill.
- [git-commit](https://github.com/JackyST0/awesome-agent-skills/tree/main/examples/git-commit) - Git commit message generator Skill.
- [unit-test-generator](https://github.com/JackyST0/awesome-agent-skills/tree/main/examples/unit-test-generator) - Unit test auto-generator Skill.
- [api-doc-generator](https://github.com/JackyST0/awesome-agent-skills/tree/main/examples/api-doc-generator) - API documentation generator Skill.
- [debug-helper](https://github.com/JackyST0/awesome-agent-skills/tree/main/examples/debug-helper) - Code debugging assistant Skill.
- [birdview](https://github.com/Qiuner/birdview) - Generate evidence-linked architecture and constraint maps, review planned change scope before implementation, and record verification results.
- [task-observer](https://github.com/rebelytics/one-skill-to-rule-them-all) - Watches work sessions, logs where skills fail, and turns the corrections into proposed skill improvements.
- [reverse-engineer-anything](https://github.com/morluto/rea/tree/main/.agents/skills/reverse-engineer-anything) - Inspect shipped binaries and JavaScript/Electron apps using REA CLI/MCP evidence; deep native analysis needs separately installed Hopper, Ghidra, or IDA.

## Productivity

- [claude-code-workflows](https://github.com/shinpr/claude-code-workflows) - Production-grade dev workflows with quality checks.
- [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) - 20+ productivity tools with 8 expert Agents.
- [claude-code-skill-factory](https://github.com/alirezarezvani/claude-code-skill-factory) - Skills factory for batch generation and deployment.
- [obra/superpowers](https://github.com/obra/superpowers) - Complete dev workflow (Debug/TDD/Code Review/Planning).
- [planning-with-files](https://github.com/OthmanAdi/planning-with-files) - Persistent file-based planning with task plans, findings, progress tracking, and session recovery for long-running agent work.
- [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) - Marketing Skills (SEO/Copywriting/CRO/Ads).
- [gingiris-opensource](https://github.com/Gingiris/gingiris-opensource) - Open source marketing playbook focused on GitHub growth and launch strategy.
- [changelog-generator](https://github.com/ComposioHQ/awesome-claude-skills/tree/master/changelog-generator) - Generate changelogs from Git commits.
- [universal-exam-cram-coach](https://github.com/ZeKaiNie/universal-examprep-skill) - Exam-prep tutor that teaches from your own slides, notes and past papers with page citations, figure crops, homework-only quizzes and cross-session progress.
- [new-term-radar](https://github.com/zhuyansen/new-term-radar) - Spots new AI model, product and repo names on X, Hugging Face, GitHub and sitemaps, then ranks the search terms behind them by Google Ads volume and DataForSEO Trends (an estimate of Google search interest). Three skills and an MCP server; needs an AIsa API key, and an optional GoAnyAPI key adds Google Trends related queries and country-level trend series.
- [answer-me-with-html](https://github.com/QingYunA/answer-me-with-html) - Agent skill that writes the answer as a Markdown draft and renders one offline HTML page, using about 1/8 of the output tokens.

## DevOps

- [devops-engineer](https://claude-plugins.dev/skills/@Jeffallan/claude-skills/devops-engineer) - DevOps engineer Skill for cloud infrastructure management.
- [claudekit-skills](https://github.com/mrgoonie/claudekit-skills) - Docker/GCP/Cloudflare deployment and management.

## Data Processing

- [context-engineering](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering) - Context engineering and multi-Agent architecture.
- [kordoc](https://github.com/chrisryugj/kordoc/tree/main/plugins/kordoc/skills/kordoc) - Korean document (HWP/HWPX/PDF) to Markdown conversion, form filling, and HWPX generation Skill.
- [jiangshan-atlas](https://github.com/DeanChensj/jiangshan-map/tree/main/skills/jiangshan-atlas) - Interactive Chinese historical atlas Skill for locating ancient places, classical poems, and figure trajectories.

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
- [product-launch-motion](https://github.com/AbubakrChan/product-launch-motion) - Turn a website URL into a 60 fps launch video with music and sound effects.

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
