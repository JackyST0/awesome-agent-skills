---
name: unit-test-generator
description: Automatically generate unit tests based on source code, supporting multiple languages and testing frameworks.
license: CC0-1.0
---

# Unit Test Generator

> 根据源代码自动生成单元测试，支持多种语言和测试框架。
>
> Automatically generate unit tests based on source code, supporting multiple languages and testing frameworks.

## When to Use

当用户请求以下操作时使用此 skill：
- 生成单元测试 / Generate unit tests
- 为函数/类编写测试 / Write tests for functions/classes
- 创建测试用例 / Create test cases
- 提高代码覆盖率 / Improve code coverage

## Instructions

### 分析步骤 / Analysis Steps

1. **识别代码** - 确定编程语言和代码结构
2. **分析功能** - 理解函数/方法的输入、输出和行为
3. **确定边界** - 识别边界条件和边缘情况
4. **选择框架** - 根据语言选择合适的测试框架
5. **生成测试** - 编写全面的测试用例

### 支持的语言和框架 / Supported Languages

| 语言 | 测试框架 |
|------|----------|
| Python | pytest, unittest |
| JavaScript/TypeScript | Jest, Mocha, Vitest |
| Java | JUnit, TestNG |
| Go | testing (built-in) |
| Rust | cargo test (built-in) |

### 测试类型 / Test Types

- **正常路径测试** - 验证预期行为
- **边界条件测试** - 测试边界值
- **异常处理测试** - 验证错误处理
- **空值/空输入测试** - 处理空值情况

### 输出格式 / Output Format

使用 `templates/test-report.md` 模板格式化输出。

Use the `templates/test-report.md` template to format output.

```markdown
## 单元测试生成报告 / Unit Test Generation Report

### 分析概述 / Analysis Summary
[代码分析总结]

### 生成的测试 / Generated Tests
[测试代码]

### 测试覆盖说明 / Coverage Notes
- 覆盖的场景
- 建议补充的测试
```

## Examples

### 输入 / Input

```python
def divide(a: float, b: float) -> float:
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b
```

### 输出 / Output

## 单元测试生成报告

### 分析概述
`divide` 函数执行除法运算，包含除零检查。需要测试正常除法、除零异常、边界值等情况。

### 生成的测试

```python
import pytest
from your_module import divide

class TestDivide:
    """Tests for the divide function."""

    def test_divide_positive_numbers(self):
        """Test division of positive numbers."""
        assert divide(10, 2) == 5.0
        assert divide(7, 2) == 3.5

    def test_divide_negative_numbers(self):
        """Test division with negative numbers."""
        assert divide(-10, 2) == -5.0
        assert divide(10, -2) == -5.0
        assert divide(-10, -2) == 5.0

    def test_divide_by_zero_raises_error(self):
        """Test that dividing by zero raises ValueError."""
        with pytest.raises(ValueError, match="Cannot divide by zero"):
            divide(10, 0)

    def test_divide_zero_numerator(self):
        """Test division when numerator is zero."""
        assert divide(0, 5) == 0.0

    def test_divide_float_precision(self):
        """Test division with floating point numbers."""
        assert divide(1, 3) == pytest.approx(0.333333, rel=1e-5)
```

### 测试覆盖说明
- ✅ 正常正数除法
- ✅ 负数除法
- ✅ 除零异常
- ✅ 分子为零
- ✅ 浮点精度
