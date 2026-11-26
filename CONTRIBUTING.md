# 贡献指南 / Contributing Guide

[中文](#中文) | [English](#english)

---

## 中文

感谢你对 Awesome Agent Skills 的贡献兴趣！

### 如何贡献

#### 添加新的条目

1. **Fork** 这个仓库
2. 在两份 README 的「按用途浏览 Skills」中选择同一个主要用途。
3. 按下方六列表头各添加一行，在「类型」列标明是单个 Skill 还是 Skills 合集。
4. 提交 **Pull Request**

> 在线搜索页的数据会在 PR 合并后由 GitHub Actions 从 `README.md` 和 `README_ZH.md` 自动生成，无需手动编辑。
>
> 普通条目 PR 只需修改 `README.md` 和 `README_ZH.md`。`docs/skills.json` 由 CI 自动生成和同步，请勿手动编辑或提交。

### 收录要求

#### 通用要求

- [ ] 条目必须公开可访问
- [ ] 描述必须清晰准确
- [ ] 链接必须有效
- [ ] 必须同时更新 `README.md` 和 `README_ZH.md`（保持双语同步）
- [ ] PR 提交前请检查格式，确保不会破坏现有文档结构；使用对应分类现有的条目格式
- [ ] 优先放入现有分类；不要为单个项目新增独立 section

#### 按条目类型区分

- [ ] **所有条目的源码仓库在审核时必须至少有 512 个 GitHub Stars（含 512）。** 以实际托管所提交 Skill 的公开仓库为准，不能借用同一组织其他项目的星数。官方、社区和已提交但尚未合并的 PR 均适用，没有豁免。
- [ ] 单个 Skill：仓库必须实际提供可使用的 `SKILL.md`。条目链接指向源码仓库或 Skill 目录，在 PR 中附上 `SKILL.md` 链接。
- [ ] Skills 合集：同一仓库必须实际提供至少两个不同的 Skill，在 PR 中附上两个对应的 `SKILL.md` 链接。指向其他仓库的链接不计入。
- [ ] 纯文档、规范、排行榜、外链导航以及安装器或管理器本身不作为条目收录。工具若随附可独立使用的 Skill，可以提交该 Skill，而不是工具首页。

#### 建议

- [ ] 优先收录开源项目
- [ ] 提供中英文描述
- [ ] 包含使用示例
- [ ] 产品集成请注明所需账号、付费服务或本地依赖
- [ ] 第三方托管试用 / Demo 入口需要清晰说明运行方式、数据处理、隐私政策和维护责任；涉及用户代码、diff、日志或凭据的外部服务通常不会直接加入 README

### 格式规范

#### Skill 条目格式

每个用途采用相同的六列。名称和描述可以翻译；两份 README 的用途、类型、平台、星数和源码链接须对应。只添加数据行，不重复表头；示例星数请替换为源码仓库的实际星数。

```markdown
| Name | Type | Description | Platforms | Stars | Source |
| --- | --- | --- | --- | --- | --- |
| my-skill | Single Skill | What the skill does. | Claude/Codex | 512 | [GitHub](URL) |
```

```markdown
| 名称 | 类型 | 描述 | 平台 | Stars | 源码 |
| --- | --- | --- | --- | --- | --- |
| my-skill | 单个 Skill | 简短说明该 Skill 的用途 | Claude/Codex | 512 | [GitHub](URL) |
```

#### 平台标识

- `All` - 支持所有平台
- `—` - 未注明平台；不要根据项目名称推断支持范围
- `Cursor` - 仅 Cursor
- `Claude` - 仅 Claude
- `Copilot` - 仅 GitHub Copilot
- `Windsurf` - 仅 Windsurf
- `Codex` - 仅 Codex
- `OpenCode` - 仅 OpenCode
- `OpenClaw` - 仅 OpenClaw
- 多个平台用 `/` 分隔：`Cursor/Claude`（仅列出已验证支持的平台）

### 用途和类型

**用途**回答「帮用户做什么」，决定条目出现在哪个栏目。每个条目只列一次；跨多个领域且没有单一主用途的综合合集放在「任务与效率」。**类型**回答「收录的是一个还是一组 Skill」：`单个 Skill` / `Skills 合集`（英文 `Single Skill` / `Skills Collection`）。同一个 Skill 的平台适配或翻译不算不同的 Skill。

| 用途 | 说明 |
|------|------|
| 开发与测试 | 编程、代码审查、调试和测试 |
| 任务与效率 | 任务规划、协作、业务流程和跨领域工作 |
| 部署运维 | 部署、基础设施和运维 |
| 数据处理 | 数据分析、转换 |
| 写作 | 撰写或编辑文档、文章 |
| 设计 | 视觉、界面和创意设计 |

如果你的条目不属于现有分类，可以在 PR 中建议新分类。

### PR 模板

提交 PR 时，请包含以下信息：

```markdown
## 添加条目

**名称**：
**类型**：单个 Skill / Skills 合集
**描述**：
**平台**：
**Stars**：
**源码**（仓库或 Skill 目录）：
**主要用途**：
**SKILL.md 链接**（合集提供两个）：

## 检查清单

- [ ] 链接有效
- [ ] 同时更新了 README.md 和 README_ZH.md
- [ ] 描述准确
- [ ] 放在正确分类
- [ ] 没有为单个项目新增独立 section
- [ ] 保持该分类现有的有意义顺序；不要求对整个历史列表重新排序
- [ ] 所附 SKILL.md 来自该源码仓库（单个 Skill 一个，合集两个不同的 Skill）
- [ ] 实际托管该 Skill 的公开 GitHub 仓库已有至少 512 Stars
```

### 本地检查

```bash
npm ci
npm run check
```

`npm run check` 会校验双语条目、搜索索引生成结果、仓库结构和安装器，不要求提交 `docs/skills.json`。

PR 检查通过 GitHub API 核对新增或更换链接的条目，不采用 README 里的星数。维护者可在已登录 GitHub CLI 的环境中运行 `npm run check:stars` 核查整个目录；是否真正提供可用的 Skill 仍需审核源码。

### 发布流程

- 公开主分支 README 中的安装版本必须始终指向已经发布的 tag。
- 发布新版本时，在同一个提交中更新中英文 README、安装脚本示例和 `checksums.txt`。
- 创建 tag 前运行 `npm ci`、`npm run check`、`npm run check:search-index` 和 `git diff --check`。
- 从上述提交创建并推送版本 tag；不要先发布引用尚不存在 tag 的安装说明。

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
2. Choose the same primary use case under “Skills by Use Case” in both READMEs.
3. Add one six-column row to each table and mark it as a single skill or a collection in the Type column.
4. Submit a **Pull Request**

> The online search page is generated automatically from `README.md` and `README_ZH.md` by GitHub Actions after PRs are merged. No manual search-index edits are required.
>
> Regular entry PRs only need to update `README.md` and `README_ZH.md`. `docs/skills.json` is generated and synchronized by CI; do not edit or submit it manually.

### Inclusion Requirements

#### General Requirements

- [ ] Entry must be publicly accessible
- [ ] Description must be clear and accurate
- [ ] Link must be valid
- [ ] Must update both `README.md` and `README_ZH.md` (keep bilingual READMEs in sync)
- [ ] Please verify formatting before submitting — use the existing entry format for the target category and do not break the document structure
- [ ] Prefer existing categories; do not create a standalone section for a single project

#### By Entry Type

- [ ] **Every entry's public source repository must have at least 512 GitHub stars at review time.** Count the stars of the repository that actually hosts the submitted skills, not another project from the same organization. This applies equally to first-party and community entries, including open PRs, without exceptions.
- [ ] Single skill: the repository must ship a usable `SKILL.md`. Link the catalog entry to the source repository or skill directory, and provide the `SKILL.md` link in the PR.
- [ ] Collection: the same repository must ship at least two distinct skills. Link two of their `SKILL.md` files in the PR. Links to skills hosted elsewhere do not count.
- [ ] Standalone documentation, specifications, rankings, link directories, installers, and managers are not catalog entries. If a tool ships a standalone skill, submit that skill rather than the tool's homepage.

#### Recommended

- [ ] Open source projects preferred
- [ ] Provide bilingual description (English/Chinese)
- [ ] Include usage examples
- [ ] For product integrations, note any required accounts, paid services, or local dependencies
- [ ] Third-party hosted trials / demos should clearly document runtime behavior, data handling, privacy policy, and maintenance responsibility; external services that process user code, diffs, logs, or credentials are generally not linked directly from the README

### Format Guidelines

#### Skill Entry Format

Every use case uses the same six columns. Names and descriptions may be translated; the use case, type, platforms, stars, and source URL must agree across both READMEs. Add only a data row, not another header. Replace the example star count with the actual count for the source repository.

```markdown
| Name | Type | Description | Platforms | Stars | Source |
| --- | --- | --- | --- | --- | --- |
| my-skill | Single Skill | What the skill does. | Claude/Codex | 512 | [GitHub](URL) |
```

```markdown
| 名称 | 类型 | 描述 | 平台 | Stars | 源码 |
| --- | --- | --- | --- | --- | --- |
| my-skill | 单个 Skill | 简短说明该 Skill 的用途 | Claude/Codex | 512 | [GitHub](URL) |
```

#### Platform Labels

- `All` - Supports all platforms
- `—` - No platform specified; do not infer support from the project name
- `Cursor` - Cursor only
- `Claude` - Claude only
- `Copilot` - GitHub Copilot only
- `Windsurf` - Windsurf only
- `Codex` - Codex only
- `OpenCode` - OpenCode only
- `OpenClaw` - OpenClaw only
- Multiple platforms separated by `/`: `Cursor/Claude` (list only platforms the project has verified)

### Use Cases and Types

The **use case** describes the task and determines the section. List each entry once; put broad collections with no single primary use case in **Tasks and Productivity**. The **type** describes what is being listed: `Single Skill` or `Skills Collection` (`单个 Skill` or `Skills 合集` in Chinese). Translations or runtime variants of the same skill do not make it a collection.

| Use case | Description |
|----------|-------------|
| Development and Testing | Programming, code review, debugging, and testing |
| Tasks and Productivity | Task planning, collaboration, business workflows, and cross-domain work |
| Deployment and Operations | Deployment, infrastructure, and operations |
| Data Processing | Data analysis, transformation |
| Writing | Writing and editing documents or articles |
| Design | Visual, interface, and creative design |

If your entry doesn't fit existing categories, feel free to suggest a new one in your PR.

### PR Template

Please include the following information when submitting a PR:

```markdown
## Add Entry

**Name**:
**Type**: Single Skill / Skills Collection
**Description**:
**Platforms**:
**Stars**:
**Source** (repository or skill directory):
**Primary use case**:
**SKILL.md link(s)** (two for a collection):

## Checklist

- [ ] Link is valid
- [ ] Updated both README.md and README_ZH.md
- [ ] Description is accurate
- [ ] Placed in correct category
- [ ] Did not create a standalone section for a single project
- [ ] Preserves the category's existing meaningful order; do not reorder the historical list solely for alphabetization
- [ ] Linked SKILL.md files belong to the source repository (one for a single skill, two distinct skills for a collection)
- [ ] The public GitHub repository hosting the submitted skills has at least 512 stars
```

### Local Validation

```bash
npm ci
npm run check
```

`npm run check` validates the bilingual entries, search-index generation, repository structure, and installers without requiring `docs/skills.json` in the PR.

PR checks look up new or relinked entries using the GitHub API rather than the displayed star counts. Maintainers can run `npm run check:stars` with an authenticated GitHub CLI to audit the full catalog. Reviewers still verify that the linked source ships usable skills.

### Release Process

- Installer versions in the public default-branch READMEs must always reference an already published tag.
- Update both READMEs, installer examples, and `checksums.txt` in the same release commit.
- Run `npm ci`, `npm run check`, `npm run check:search-index`, and `git diff --check` before creating the tag.
- Create and push the version tag from that exact commit; do not publish installation instructions that reference a tag that does not exist yet.

### Report Issues

If you find broken links, incorrect descriptions, or miscategorized items, please submit an Issue or a PR to fix them.

### Code of Conduct

- Respect all contributors
- Maintain a friendly discussion atmosphere
- Focus on technical content

If you have any questions, feel free to open an Issue.

---

Thanks for contributing! 🎉
