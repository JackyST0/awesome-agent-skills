---
name: git-commit
description: Git commit message generator that creates conventional commit messages based on code changes.
license: CC0-1.0
---

# Git Commit

> Git 提交信息生成技能，根据代码变更自动生成规范的 commit message。
>
> Git commit message generator that creates conventional commit messages based on code changes.

## When to Use

当用户请求以下操作时使用此 skill：
- 生成 commit message / Generate commit message
- 写提交信息 / Write commit message
- 提交代码 / Commit code
- 描述代码变更 / Describe code changes

## Instructions

### 提交信息格式 / Commit Message Format

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 类型 / Types

| Type | 说明 / Description |
|------|---------------------|
| feat | 新功能 / New feature |
| fix | 修复 bug / Bug fix |
| docs | 文档变更 / Documentation |
| style | 格式调整 / Formatting |
| refactor | 重构 / Refactoring |
| perf | 性能优化 / Performance |
| test | 测试相关 / Tests |
| chore | 构建/工具 / Build/tools |

### 生成步骤 / Generation Steps

1. **分析变更** - 查看 `git diff` 或 `git status`
2. **确定类型** - 根据变更内容选择合适的 type
3. **提取范围** - 确定影响的模块或组件
4. **撰写主题** - 用简洁的语言描述变更（50 字符内）
5. **添加正文** - 如需要，详细说明变更原因和影响

### 规则 / Rules

- 主题行不超过 50 个字符
- 使用祈使句（如 "add" 而非 "added"）
- 主题行首字母小写
- 主题行结尾不加句号
- 正文每行不超过 72 个字符

## Examples

### 示例 1：新功能

```
feat(auth): add OAuth2 login support

- Add Google OAuth2 provider
- Add GitHub OAuth2 provider
- Update login page with social login buttons
```

### 示例 2：修复 Bug

```
fix(api): resolve null pointer in user service

The getUserById method was not handling the case when
user doesn't exist, causing a NullPointerException.

Closes #123
```

### 示例 3：文档更新

```
docs(readme): update installation instructions

Add Docker setup guide and clarify environment variables.
```

### 示例 4：重构

```
refactor(database): migrate from callbacks to async/await

Convert all database operations to use async/await pattern
for better readability and error handling.
```
