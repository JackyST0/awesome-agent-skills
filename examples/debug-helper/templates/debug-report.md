# Debug Analysis Report

**Date**: {{date}}
**Error Type**: `{{error_type}}`
**Severity**: {{severity}}

---

## Error Summary

### What Happened

{{error_description}}

### Error Message

```
{{error_message}}
```

### Stack Trace

```
{{stack_trace}}
```

---

## Root Cause Analysis

### Direct Cause

{{direct_cause}}

### Underlying Issues

{{#each underlying_issues}}
{{@index}}. {{this}}
{{/each}}

---

## Affected Code

**File**: `{{file_path}}`
**Line**: {{line_number}}

```{{language}}
{{code_snippet}}
```

---

## Recommended Fixes

{{#each fixes}}

### Option {{@index}}: {{title}}

**Approach**: {{approach}}

**Code Change**:
```{{language}}
{{code}}
```

**Pros**:
{{#each pros}}
- {{this}}
{{/each}}

**Cons**:
{{#each cons}}
- {{this}}
{{/each}}

---

{{/each}}

## Prevention Strategies

{{#each prevention}}
- [ ] {{this}}
{{/each}}

---

## Related Resources

{{#each resources}}
- [{{title}}]({{url}})
{{/each}}

---

## Verification Steps

After applying the fix:

{{#each verification_steps}}
{{@index}}. {{this}}
{{/each}}
