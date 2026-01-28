# Unit Test Generation Report

## Analysis Summary

**Source File**: `{{source_file}}`
**Language**: {{language}}
**Test Framework**: {{framework}}
**Generated**: {{date}}

---

## Functions Analyzed

| Function | Parameters | Return Type | Test Cases |
|----------|------------|-------------|------------|
{{#each functions}}
| `{{name}}` | {{params}} | {{return_type}} | {{test_count}} |
{{/each}}

---

## Generated Tests

```{{language}}
{{test_code}}
```

---

## Test Coverage Summary

| Category | Count |
|----------|-------|
| Normal path tests | {{normal_count}} |
| Boundary tests | {{boundary_count}} |
| Exception tests | {{exception_count}} |
| Edge case tests | {{edge_count}} |
| **Total** | **{{total_count}}** |

---

## Recommendations

{{#each recommendations}}
- {{this}}
{{/each}}

---

## How to Run

```bash
{{run_command}}
```
