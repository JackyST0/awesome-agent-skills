<p align="center">
  <img src="assets/banner.svg" alt="Awesome Agent Skills" width="100%">
</p>

<p align="center">
  <a href="https://awesome.re"><img src="https://awesome.re/badge.svg" alt="Awesome"></a>
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"></a>
  <a href="https://creativecommons.org/publicdomain/zero/1.0/"><img src="https://img.shields.io/badge/License-CC0-lightgrey.svg" alt="License: CC0"></a>
  <img src="https://img.shields.io/github/stars/JackyST0/awesome-agent-skills?style=social" alt="GitHub Stars">
</p>

<p align="center">
  <a href="https://jackyst0.github.io/awesome-agent-skills/"><b>🔍 在线搜索 Skills</b></a>
</p>

# Awesome Agent Skills

> 🤖 精选的 AI Agent Skills 列表，适用于 Cursor、Claude Code、GitHub Copilot 等 AI 编程工具。
>
> Agent Skills 是 AI Agent 可以发现和使用的指令、脚本和资源包，让 AI 更好地完成特定任务。

[English](README_EN.md) | [简体中文](README.md)

---

## 快速开始

### 一键安装（推荐）

**macOS / Linux:**

```bash
# 交互式模式 - 支持安装、卸载、查看
curl -sL https://raw.githubusercontent.com/JackyST0/awesome-agent-skills/main/install.sh | bash

# 或直接安装到指定平台
curl -sL https://raw.githubusercontent.com/JackyST0/awesome-agent-skills/main/install.sh | bash -s -- -p cursor -a

# 卸载 Skills
curl -sL https://raw.githubusercontent.com/JackyST0/awesome-agent-skills/main/install.sh | bash -s -- -p cursor -u -s code-review

# 查看已安装的 Skills
curl -sL https://raw.githubusercontent.com/JackyST0/awesome-agent-skills/main/install.sh | bash -s -- -p cursor --list-installed
```

**Windows (PowerShell):**

```powershell
# 下载并运行安装脚本
irm https://raw.githubusercontent.com/JackyST0/awesome-agent-skills/main/install.ps1 | iex

# 或者先下载再运行（推荐）
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/JackyST0/awesome-agent-skills/main/install.ps1" -OutFile "install.ps1"
.\install.ps1                                    # 交互式模式
.\install.ps1 -Platform cursor -All              # 安装所有 Skills
.\install.ps1 -Platform cursor -Uninstall -All   # 卸载所有 Skills
.\install.ps1 -Platform cursor -ListInstalled    # 查看已安装
```

### 手动安装

```bash
# 克隆本仓库的示例
git clone https://github.com/JackyST0/awesome-agent-skills.git
cp -r awesome-agent-skills/examples/code-review ~/.cursor/skills/

# 或克隆官方 Skills
git clone https://github.com/anthropics/skills.git ~/.cursor/skills/anthropics
```

---

## 在线搜索

不想翻阅长列表？试试 **[在线搜索工具](https://jackyst0.github.io/awesome-agent-skills/)**，支持按名称、描述、平台快速筛选！

---

## 目录

- [什么是 Agent Skills](#什么是-agent-skills)
- [如何使用](#如何使用)
- [Skills 列表](#skills-列表)
  - [官方资源](#官方资源)
  - [Skills 合集](#skills-合集)
  - [开发工具](#开发工具)
  - [效率提升](#效率提升)
  - [DevOps](#devops)
  - [数据处理](#数据处理)
  - [写作创作](#写作创作)
  - [设计相关](#设计相关)
- [如何贡献](#如何贡献)
- [创建你自己的 Skill](#创建你自己的-skill)

## 什么是 Agent Skills

Agent Skills 是一种让 AI Agent 更智能的方式。每个 Skill 包含：

- `SKILL.md` - 核心说明文件，告诉 AI 如何使用这个技能
- `scripts/` - 可选的脚本文件
- `templates/` - 可选的模板文件
- `resources/` - 其他资源文件

Skills 可在多个平台使用：

| 平台 | 全局目录 | 项目目录 |
|------|----------|----------|
| Cursor | `~/.cursor/skills/` | `.cursor/skills/` |
| Claude Code | `~/.claude/skills/` | `.claude/skills/` |
| GitHub Copilot | `~/.copilot/skills/` | `.github/skills/` |
| Windsurf | `~/.windsurf/skills/` | `.windsurf/skills/` |
| OpenAI Codex | `~/.codex/skills/` | `.codex/skills/` |

## 如何使用

### 方式一：手动复制

```bash
# Cursor
cp -r my-skill ~/.cursor/skills/

# Claude Code
cp -r my-skill ~/.claude/skills/

# GitHub Copilot
cp -r my-skill ~/.copilot/skills/
# 或项目级
cp -r my-skill .github/skills/
```

### 方式二：Git Clone

```bash
# 克隆到全局目录
git clone https://github.com/example/my-skill.git ~/.cursor/skills/my-skill
```

> 💡 **提示**：全局 skills 对所有项目生效，项目级 skills 仅对当前项目生效。
> 
> 📖 **详细指南**：查看 [如何使用 Agent Skills](docs/how-to-use.md)

## Skills 列表

### 官方资源

| 名称 | 描述 | Stars | 链接 |
|------|------|-------|------|
| Agent Skills 开放标准 | Agent Skills 官方规范文档 | - | [skill.md](https://skill.md/) |
| Agent Skills 规范 | SKILL.md 格式规范 | - | [agentskills.io](https://agentskills.io/specification) |
| anthropics/skills | ⭐ Anthropic 官方 Agent Skills 仓库 | 60.3k | [GitHub](https://github.com/anthropics/skills) |
| github/awesome-copilot | GitHub 官方 Copilot 资源合集 | - | [GitHub](https://github.com/github/awesome-copilot) |
| Agent Skills 索引 | 社区 Skills 搜索引擎 | - | [agent-skills.md](https://agent-skills.md/) |

### Skills 合集

| 名称 | 描述 | Stars | 链接 |
|------|------|-------|------|
| awesome-cursorrules | ⭐ 最全面的 Cursor Rules 合集 | 37.5k | [GitHub](https://github.com/PatrickJS/awesome-cursorrules) |
| everything-claude-code | ⭐ Claude Code 配置大全（agents/skills/hooks） | 37.1k | [GitHub](https://github.com/affaan-m/everything-claude-code) |
| awesome-claude-skills | ⭐ Composio 维护的 Claude Skills 合集 | 28.9k | [GitHub](https://github.com/ComposioHQ/awesome-claude-skills) |
| awesome-claude-code | ⭐ Claude Code skills/hooks/插件合集 | 22.5k | [GitHub](https://github.com/hesreallyhim/awesome-claude-code) |
| openskills | ⭐ 通用 Skills 加载器（npm 安装） | 7.7k | [GitHub](https://github.com/numman-ali/openskills) |
| awesome-claude-skills | VoltAgent 维护的 Claude Skills 合集 | 4.4k | [GitHub](https://github.com/VoltAgent/awesome-claude-skills) |
| claude-skills | Simon Willison 的 Claude Skills 文档 | 912 | [GitHub](https://github.com/simonw/claude-skills) |
| claude-skills-collection | 官方与社区 Skills 精选集合 | 417 | [GitHub](https://github.com/abubakarsiddik31/claude-skills-collection) |
| cursor-rules-and-prompts | Cursor 规则与提示词集合 | 118 | [GitHub](https://github.com/thehimel/cursor-rules-and-prompts) |
| claude-code-kit | Claude Code 工具包，自动激活 skills | 60 | [GitHub](https://github.com/blencorp/claude-code-kit) |

### 开发工具

| 名称 | 描述 | 平台 | 链接 |
|------|------|------|------|
| agentfund-mcp | AI Agent 众筹平台 MCP 服务器（Base 链） | All | [GitHub](https://github.com/RioBot-Grind/agentfund-mcp) |
| claude-code-security-review | ⭐ AI 安全审查 GitHub Action（官方） | Claude | [GitHub](https://github.com/anthropics/claude-code-security-review) |
| trailofbits/skills | ⭐ Trail of Bits 安全研究和审计 Skills | Claude | [GitHub](https://github.com/trailofbits/skills) |
| playwright-skill | Playwright 浏览器自动化测试 Skill | Claude | [GitHub](https://github.com/lackeyjb/playwright-skill) |
| gh-code-review | GitHub PR 代码审查 Skill | Copilot | [GitHub](https://github.com/bkircher/skills) |
| skill-codex | 将任务委派给 Codex 的 Skill | Claude | [GitHub](https://github.com/skills-directory/skill-codex) |
| skillset-example | GitHub Copilot 扩展示例 | Copilot | [GitHub](https://github.com/copilot-extensions/skillset-example) |
| claude-code-skills | 专业级 Skills 市场 | Claude | [GitHub](https://github.com/daymade/claude-code-skills) |
| code-review | 智能代码审查示例 Skill | All | [示例](examples/code-review/) |
| git-commit | Git 提交信息生成示例 Skill | All | [示例](examples/git-commit/) |
| unit-test-generator | 单元测试自动生成 Skill | All | [示例](examples/unit-test-generator/) |
| api-doc-generator | API 文档生成 Skill | All | [示例](examples/api-doc-generator/) |
| debug-helper | 代码调试助手 Skill | All | [示例](examples/debug-helper/) |

### 效率提升

| 名称 | 描述 | 平台 | 链接 |
|------|------|------|------|
| claude-code-workflows | 生产级开发工作流，自动化质量检查 | Claude | [GitHub](https://github.com/shinpr/claude-code-workflows) |
| claude-skills | 20+ 生产力工具，含 8 个专家 Agent | Claude | [GitHub](https://github.com/alirezarezvani/claude-skills) |
| claude-code-skill-factory | Skills 工厂，批量生成和部署 Skills | Claude | [GitHub](https://github.com/alirezarezvani/claude-code-skill-factory) |
| changelog-generator | 从 Git 提交自动生成 Changelog | Claude | [ComposioHQ](https://github.com/ComposioHQ/awesome-claude-skills) |

### DevOps

| 名称 | 描述 | 平台 | 链接 |
|------|------|------|------|
| devops-claude-skills | DevOps 工作流市场，含 Terraform/K8s | Claude | [GitHub](https://github.com/ahmedasmar/devops-claude-skills) |
| devops-engineer | DevOps 工程师 Skill，云基础设施管理 | Claude | [claude-plugins.dev](https://claude-plugins.dev/skills/@Jeffallan/claude-skills/devops-engineer) |
| ci-cd | CI/CD 管道设计、优化和安全扫描 | Claude | [claude-plugins.dev](https://claude-plugins.dev/skills/@ahmedasmar/devops-claude-skills/ci-cd) |
| claudekit-skills | Docker/GCP/Cloudflare 部署和管理 | Claude | [GitHub](https://github.com/mrgoonie/claudekit-skills) |
| claudebox | Docker 容器化 Claude Code 开发环境 | Claude | [GitHub](https://github.com/RchGrav/claudebox) |

### 数据处理

| 名称 | 描述 | 平台 | 链接 |
|------|------|------|------|
| d3-visualization | D3.js 数据可视化 Skill | Claude | [ComposioHQ](https://github.com/ComposioHQ/awesome-claude-skills) |
| context-engineering | 上下文工程和多 Agent 架构 Skills | All | [GitHub](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering) |

### 写作创作

| 名称 | 描述 | 平台 | 链接 |
|------|------|------|------|
| doc-coauthoring | ⭐ 文档协作撰写 Skill | Claude | [官方](https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring) |
| internal-comms | ⭐ 内部沟通文档生成 Skill | Claude | [官方](https://github.com/anthropics/skills/tree/main/skills/internal-comms) |
| docx | ⭐ Word 文档读写处理 Skill | Claude | [官方](https://github.com/anthropics/skills/tree/main/skills/docx) |
| pdf | ⭐ PDF 文档处理 Skill | Claude | [官方](https://github.com/anthropics/skills/tree/main/skills/pdf) |
| pptx | ⭐ PPT 演示文稿生成 Skill | Claude | [官方](https://github.com/anthropics/skills/tree/main/skills/pptx) |
| xlsx | ⭐ Excel 表格处理 Skill | Claude | [官方](https://github.com/anthropics/skills/tree/main/skills/xlsx) |

### 设计相关

| 名称 | 描述 | 平台 | 链接 |
|------|------|------|------|
| frontend-design | ⭐ 前端 UI 设计 Skill | Claude | [官方](https://github.com/anthropics/skills/tree/main/skills/frontend-design) |
| brand-guidelines | ⭐ 品牌设计规范 Skill | Claude | [官方](https://github.com/anthropics/skills/tree/main/skills/brand-guidelines) |
| canvas-design | ⭐ Canvas 画布设计 Skill | Claude | [官方](https://github.com/anthropics/skills/tree/main/skills/canvas-design) |
| theme-factory | ⭐ 主题样式工厂 Skill | Claude | [官方](https://github.com/anthropics/skills/tree/main/skills/theme-factory) |
| algorithmic-art | ⭐ 算法艺术生成 Skill | Claude | [官方](https://github.com/anthropics/skills/tree/main/skills/algorithmic-art) |
| slack-gif-creator | ⭐ Slack GIF 创建 Skill | Claude | [官方](https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator) |

---

> 🚧 发现更多优秀 Skills？[提交你的发现 →](CONTRIBUTING.md)

## 如何贡献

欢迎提交 PR！请遵循以下步骤：

1. Fork 这个仓库
2. 添加你的 skill 到对应分类
3. 确保填写完整信息（名称、描述、平台、链接）
4. 提交 Pull Request

### 贡献规范

- 每个 skill 必须有清晰的描述
- 链接必须有效且可访问
- 优先收录开源项目
- 请按字母顺序排列

详细指南请查看 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 创建你自己的 Skill

基本结构：

```
my-skill/
├── SKILL.md          # 必需：说明文件
├── scripts/          # 可选：脚本
├── templates/        # 可选：模板
└── examples/         # 可选：示例
```

📁 **查看示例**：本仓库的 [examples/](examples/) 目录包含 5 个可直接使用的示例 Skills。

📖 **创建指南**：查看 [如何创建 Skill](docs/how-to-create.md) 了解详细步骤。

📋 **规范文档**：查看 [SKILL.md 规范](docs/skill-spec.md) 了解格式标准和最佳实践。

---

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=JackyST0/awesome-agent-skills&type=Date)](https://star-history.com/#JackyST0/awesome-agent-skills&Date)

---

## 许可证

[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

在法律允许的范围内，贡献者已放弃此作品的所有版权和相关权利。
