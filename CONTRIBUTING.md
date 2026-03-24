# 贡献指南 / Contributing Guide

[中文](#中文) | [English](#english)

---

## 中文

感谢你对 Awesome Agent Skills 的贡献兴趣！

### 如何贡献

#### 添加新的条目

1. **Fork** 这个仓库
2. 在 README.md 和 README_ZH.md 中找到合适的分类
3. 按照格式添加你的条目：

```markdown
| skill-name | 简短描述 | 支持平台 | [GitHub](URL) |
```

4. 提交 **Pull Request**

### 收录要求

#### 通用要求

- [ ] 条目必须公开可访问
- [ ] 描述必须清晰准确
- [ ] 链接必须有效
- [ ] 必须同时更新 `README.md` 和 `README_ZH.md`（保持双语同步）
- [ ] PR 提交前请检查格式，确保不会破坏现有文档结构
- [ ] 优先放入现有分类；不要为单个项目新增独立 section

#### 按条目类型区分

- [ ] 单个 Skill 仓库：必须包含 `SKILL.md`，并且 GitHub 仓库至少 **20+ Stars**
- [ ] Skills 合集 / 管理器 / 安装器：必须明确服务于 Skills 的发现、安装、同步、分发或管理；不强制仓库根目录包含 `SKILL.md`，但 GitHub 仓库至少 **20+ Stars**
- [ ] 官方资源：可不受 Stars 限制，但必须是官方项目、官方文档或公认的生态基础设施

#### 建议

- [ ] 优先收录开源项目
- [ ] 提供中英文描述
- [ ] 包含使用示例
- [ ] 商业产品封装通常需要更高的社区认可度

### 格式规范

#### Skill 条目格式

```markdown
| 名称 | 描述 | 平台 | 链接 |
|------|------|------|------|
| my-skill | 做什么的简短描述（10-20字） | All | [链接](https://github.com/...) |
```

#### 平台标识

- `All` - 支持所有平台
- `Cursor` - 仅 Cursor
- `Claude` - 仅 Claude
- `Copilot` - 仅 GitHub Copilot
- `Windsurf` - 仅 Windsurf
- `Codex` - 仅 Codex
- `OpenCode` - 仅 OpenCode
- `OpenClaw` - 仅 OpenClaw
- 多个平台用 `/` 分隔：`Cursor/Claude`

### 分类说明

| 分类 | 说明 |
|------|------|
| 官方资源 | 官方维护的资源、文档和生态基础设施 |
| Skills 合集 | 多个 skills 的集合仓库，以及 skills 管理/安装工具 |
| 开发工具 | 代码审查、调试、测试等 |
| 效率提升 | 通用生产力工具 |
| 写作创作 | 文档、文章相关 |
| 数据处理 | 数据分析、转换 |
| DevOps | 部署、运维相关 |
| 设计相关 | UI/UX 设计 |

如果你的条目不属于现有分类，可以在 PR 中建议新分类。

### PR 模板

提交 PR 时，请包含以下信息：

```markdown
## 添加条目

**名称**：
**链接**：
**描述**：
**分类**：
**类型**：单个 Skill / Skills 合集 / 管理器 / 安装器 / 官方资源

## 检查清单

- [ ] 链接有效
- [ ] 同时更新了 README.md 和 README_ZH.md
- [ ] 描述准确
- [ ] 放在正确分类
- [ ] 没有为单个项目新增独立 section
- [ ] 按字母顺序排列
- [ ] 单个 Skill 仓库包含 SKILL.md
- [ ] Skills 合集 / 管理器 / 安装器明确服务于 Skills 生态
- [ ] GitHub 仓库满足最低门槛（社区项目 20+ Stars）
```

### 报告问题

如果发现失效链接、错误描述或分类不当，请提交 Issue 或直接 PR 修复。

### 行为准则

- 尊重所有贡献者
- 保持友好的讨论氛围
- 专注于技术内容

如有疑问，欢迎提交 Issue 讨论。

---

## English

Thanks for your interest in contributing to Awesome Agent Skills!

### How to Contribute

#### Adding a New Entry

1. **Fork** this repository
2. Find the appropriate category in both README.md and README_ZH.md
3. Add your entry following the format:

```markdown
| skill-name | Short description | Platform | [GitHub](URL) |
```

4. Submit a **Pull Request**

### Inclusion Requirements

#### General Requirements

- [ ] Entry must be publicly accessible
- [ ] Description must be clear and accurate
- [ ] Link must be valid
- [ ] Must update both `README.md` and `README_ZH.md` (keep bilingual READMEs in sync)
- [ ] Please verify formatting before submitting — PRs that break existing document structure will be rejected
- [ ] Prefer existing categories; do not create a standalone section for a single project

#### By Entry Type

- [ ] Single Skill repositories: must contain a `SKILL.md` file and have at least **20+ GitHub Stars**
- [ ] Skills collections / managers / installers: must clearly serve skill discovery, installation, sync, distribution, or management; `SKILL.md` at the repo root is not required, but the repository must have at least **20+ GitHub Stars**
- [ ] Official Resources: may be exempt from the stars threshold, but must be official projects, official docs, or widely recognized ecosystem infrastructure

#### Recommended

- [ ] Open source projects preferred
- [ ] Provide bilingual description (English/Chinese)
- [ ] Include usage examples
- [ ] Commercial product wrappers typically require higher community validation

### Format Guidelines

#### Skill Entry Format

```markdown
| Name | Description | Platform | Link |
|------|-------------|----------|------|
| my-skill | Short description of what it does (10-20 words) | All | [Link](https://github.com/...) |
```

#### Platform Labels

- `All` - Supports all platforms
- `Cursor` - Cursor only
- `Claude` - Claude only
- `Copilot` - GitHub Copilot only
- `Windsurf` - Windsurf only
- `Codex` - Codex only
- `OpenCode` - OpenCode only
- `OpenClaw` - OpenClaw only
- Multiple platforms separated by `/`: `Cursor/Claude`

### Categories

| Category | Description |
|----------|-------------|
| Official Resources | Officially maintained resources, docs, and ecosystem infrastructure |
| Skills Collections | Repositories containing multiple skills, plus skill managers/installers |
| Development Tools | Code review, debugging, testing, etc. |
| Productivity | General productivity tools |
| Writing | Documentation, articles |
| Data Processing | Data analysis, transformation |
| DevOps | Deployment, operations |
| Design | UI/UX design |

If your entry doesn't fit existing categories, feel free to suggest a new one in your PR.

### PR Template

Please include the following information when submitting a PR:

```markdown
## Add Entry

**Name**:
**Link**:
**Description**:
**Category**:
**Type**: Single Skill / Skills Collection / Manager / Installer / Official Resource

## Checklist

- [ ] Link is valid
- [ ] Updated both README.md and README_ZH.md
- [ ] Description is accurate
- [ ] Placed in correct category
- [ ] Did not create a standalone section for a single project
- [ ] Alphabetically ordered
- [ ] Single Skill repository contains SKILL.md
- [ ] Skills collections / managers / installers clearly serve the skills ecosystem
- [ ] Repository meets the minimum threshold (20+ Stars for community projects)
```

### Report Issues

If you find broken links, incorrect descriptions, or miscategorized items, please submit an Issue or a PR to fix them.

### Code of Conduct

- Respect all contributors
- Maintain a friendly discussion atmosphere
- Focus on technical content

If you have any questions, feel free to open an Issue.

---

Thanks for contributing! 🎉
