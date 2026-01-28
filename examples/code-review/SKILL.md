---
name: code-review
description: Smart code review skill that helps review code quality, identify potential issues, and provide improvement suggestions.
license: CC0-1.0
---

# Code Review

> 智能代码审查技能，帮助审查代码质量、发现潜在问题、提供改进建议。
>
> Smart code review skill that helps review code quality, identify potential issues, and provide improvement suggestions.

## When to Use

当用户请求以下操作时使用此 skill：
- 审查代码 / Review code
- 检查代码质量 / Check code quality
- 寻找代码中的问题 / Find issues in code
- 请求代码改进建议 / Request improvement suggestions

## Instructions

### 审查步骤 / Review Steps

1. **阅读代码** - 仔细阅读提供的代码
2. **检查问题**：
   - 语法错误 / Syntax errors
   - 逻辑问题 / Logic issues
   - 安全隐患 / Security vulnerabilities
   - 性能问题 / Performance issues
   - 代码风格 / Code style
3. **提供建议** - 给出具体的改进建议
4. **输出报告** - 使用标准格式生成审查报告

### 输出格式 / Output Format

```markdown
## 代码审查报告 / Code Review Report

### 概述 / Summary
[简要总结 / Brief summary]

### 发现的问题 / Issues Found
- [ ] 问题 1 / Issue 1
- [ ] 问题 2 / Issue 2

### 改进建议 / Suggestions
1. 建议 1 / Suggestion 1
2. 建议 2 / Suggestion 2

### 评分 / Score
- 代码质量 / Code Quality: X/10
- 可读性 / Readability: X/10
- 可维护性 / Maintainability: X/10
```

## Examples

### 输入 / Input

```python
def calc(x,y):
    return x+y
```

### 输出 / Output

## 代码审查报告

### 概述
简单的加法函数，存在命名和格式问题。

### 发现的问题
- [ ] 函数名 `calc` 不具描述性
- [ ] 缺少类型提示
- [ ] 缺少文档字符串
- [ ] 运算符周围缺少空格

### 改进建议
1. 将函数重命名为 `add_numbers`
2. 添加类型提示：`def add_numbers(x: int, y: int) -> int:`
3. 添加 docstring 说明函数用途
4. 遵循 PEP 8 格式规范

### 评分
- 代码质量: 6/10
- 可读性: 7/10
- 可维护性: 5/10
