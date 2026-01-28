# 如何创建 Agent Skill

本指南将帮助你创建一个标准的 Agent Skill，可在 Cursor、Claude、Codex 等平台使用。

> 📋 **规范文档**: 查看 [SKILL.md 规范文档](skill-spec.md) 了解完整的格式规范和最佳实践。

## 快速开始

### 1. 创建目录结构

```bash
mkdir my-awesome-skill
cd my-awesome-skill
```

### 2. 创建 SKILL.md

这是最核心的文件，告诉 AI Agent 如何使用你的 skill。

```markdown
---
name: my-awesome-skill
description: A brief description of what this skill does.
license: MIT
---

# My Awesome Skill

> 简要描述这个 skill 做什么。

## When to Use

描述什么情况下应该使用这个 skill。

## Instructions

详细的使用说明...

## Examples

使用示例...
```

#### YAML Frontmatter 说明

| 字段 | 必需 | 说明 |
|------|------|------|
| `name` | ✅ | 小写字母，用连字符分隔（如 `code-review`） |
| `description` | ✅ | 简短的英文描述，说明 skill 功能和使用场景 |
| `license` | ❌ | 许可证（如 MIT, CC0-1.0, Apache-2.0） |

### 3. 添加脚本（可选）

```bash
mkdir scripts
# 添加你的脚本文件
```

## 完整示例

### 目录结构

```
code-review-skill/
├── SKILL.md              # 核心说明文件
├── scripts/
│   └── analyze.py        # 分析脚本
├── templates/
│   └── review-template.md # 审查模板
└── examples/
    └── sample-review.md   # 示例输出
```

### SKILL.md 示例

```markdown
---
name: code-review
description: Smart code review skill that helps review code quality and provide improvement suggestions.
license: MIT
---

# Code Review Skill

> 智能代码审查技能，帮助你审查代码质量、发现潜在问题、提供改进建议。

## When to Use

当用户请求以下操作时使用此 skill：
- 审查代码
- 检查代码质量
- 寻找代码中的问题
- 请求代码改进建议

## Instructions

### 审查步骤

1. **阅读代码**：仔细阅读提供的代码
2. **检查问题**：
   - 语法错误
   - 逻辑问题
   - 安全隐患
   - 性能问题
3. **提供建议**：给出具体的改进建议
4. **输出报告**：使用模板生成审查报告

### 输出格式

使用以下格式输出审查结果：

## 代码审查报告

### 概述
[简要总结]

### 发现的问题
- [ ] 问题1
- [ ] 问题2

### 改进建议
1. 建议1
2. 建议2

### 评分
- 代码质量：X/10
- 可读性：X/10
- 可维护性：X/10

## Examples

### 输入
```python
def calc(x,y):
    return x+y
```

### 输出
## 代码审查报告

### 概述
简单的加法函数，存在命名和格式问题。

### 发现的问题
- [ ] 函数名不具描述性
- [ ] 缺少类型提示
- [ ] 缺少文档字符串

### 改进建议
1. 将函数重命名为 `add_numbers`
2. 添加类型提示
3. 添加 docstring

### 评分
- 代码质量：6/10
- 可读性：7/10
- 可维护性：5/10
```

## 最佳实践

### 1. 清晰的触发条件

在 "When to Use" 部分明确说明何时使用此 skill：

```markdown
## When to Use

使用此 skill 当用户：
- 明确请求 "审查代码"
- 说 "帮我检查这段代码"
- 问 "这段代码有什么问题"
```

### 2. 详细的指令

提供足够详细的指令，让 AI 知道每一步该做什么：

```markdown
## Instructions

### 第一步：分析输入
- 确定编程语言
- 识别代码结构

### 第二步：执行检查
- 运行静态分析
- 检查代码规范

### 第三步：生成报告
- 使用模板格式
- 包含所有发现
```

### 3. 提供示例

示例帮助 AI 理解预期的输入和输出：

```markdown
## Examples

### 示例 1：简单函数
**输入**：[代码]
**输出**：[结果]

### 示例 2：复杂类
**输入**：[代码]
**输出**：[结果]
```

### 4. 使用模板

如果输出有固定格式，提供模板文件：

```
templates/
├── report.md
├── summary.md
└── checklist.md
```

## 发布你的 Skill

1. **创建 GitHub 仓库**
2. **添加 README**：说明如何安装和使用
3. **提交到 awesome-agent-skills**：提 PR 添加到列表

### 推荐的 README 结构

```markdown
# My Skill Name

简短描述

## 安装

## 使用方法

## 示例

## 许可证
```

## 常见问题

### Q: SKILL.md 必须是英文吗？

不一定，中英文都可以。但建议提供双语版本以获得更广泛的用户。

### Q: 可以包含二进制文件吗？

不建议。尽量使用文本格式的脚本和配置。

### Q: 如何测试我的 skill？

在 Cursor 或 Claude 中，将 skill 放入对应目录，然后尝试触发使用场景。

---

## 更多资源

- [SKILL.md 规范文档](skill-spec.md) - 完整的格式规范和最佳实践
- [Anthropic 官方 Skills 仓库](https://github.com/anthropics/skills)
- [Awesome Cursor Rules](https://github.com/PatrickJS/awesome-cursorrules)
- [GitHub Copilot Agent Skills 文档](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
