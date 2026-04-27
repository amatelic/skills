---
name: debug-code
description: Systematic debugging approach for identifying and fixing bugs in code. Use when the user reports errors, unexpected behavior, crashes, or needs help troubleshooting code issues.
version: 1.0.0
user-invocable: true
---

Debug code issues systematically to identify root causes and implement fixes.

## Initial Assessment

Before debugging, gather context:

1. **Error Information**:
   - What is the exact error message?
   - When does it occur? (Startup, specific action, random)
   - What changed recently? (Code changes, dependencies, environment)

2. **Environment Details**:
   - Programming language and version
   - Framework/library versions
   - Operating system
   - Browser (if applicable)

3. **Reproduction**:
   - Can the issue be reproduced consistently?
   - What are the exact steps to reproduce?
   - Is there a minimal code example that triggers it?

## Debugging Strategy

### 1. Reproduce the Issue

- Confirm you can reproduce the bug
- Create a minimal test case if possible
- Document the exact conditions that trigger it

### 2. Isolate the Problem

**Binary Search Method**:
- Comment out half the code
- If bug persists, it's in the remaining half
- Repeat until you isolate the problematic section

**Logging/Print Statements**:
- Add logging at key points to trace execution flow
- Check variable values at critical moments
- Verify assumptions about data state

**Debugger Tools**:
- Set breakpoints at suspected locations
- Step through code line by line
- Inspect variable values and call stack

### 3. Analyze Root Cause

Common bug categories:

**Logic Errors**:
- Off-by-one errors
- Incorrect conditional logic
- Wrong operator precedence
- Infinite loops

**Data Issues**:
- Null/undefined values
- Type mismatches
- Incorrect data formats
- Race conditions

**Environment Issues**:
- Missing dependencies
- Version incompatibilities
- Configuration errors
- Permission problems

**Integration Issues**:
- API changes
- Database schema mismatches
- External service failures

### 4. Implement Fix

**Verify the Root Cause**:
- Confirm your understanding of why the bug occurs
- Check if the fix addresses the root cause, not just symptoms

**Minimal Fix**:
- Make the smallest change that fixes the issue
- Avoid refactoring unrelated code
- Don't optimize prematurely

**Edge Cases**:
- Consider what other scenarios might be affected
- Test boundary conditions
- Check for similar issues elsewhere in the codebase

### 5. Verify Fix

- Reproduce the original bug to confirm it's fixed
- Run existing tests to ensure no regressions
- Add a test case for this specific bug
- Test edge cases related to the fix

## Common Debugging Techniques

### For Specific Languages

**JavaScript/TypeScript**:
- Use `console.log()` for quick checks
- Use debugger statement for breakpoints
- Check browser DevTools Network tab for API issues
- Verify async/await usage and Promise handling

**Python**:
- Use `pdb` for interactive debugging
- Add `import pdb; pdb.set_trace()` for breakpoints
- Check `traceback` for stack traces
- Use `logging` module for structured logging

**Java**:
- Use IDE debugger (IntelliJ, Eclipse)
- Check stack traces carefully
- Verify null checks
- Review exception handling

**Go**:
- Use `delve` debugger
- Add strategic `fmt.Printf()` statements
- Check error handling (`if err != nil`)
- Review goroutine synchronization

## Communication

When reporting findings:

1. **Explain the root cause** clearly
2. **Show the specific code** that caused the issue
3. **Present the fix** with before/after comparison
4. **Suggest preventive measures** to avoid similar bugs
5. **Verify the user understands** the solution

## Prevention

After fixing, consider:

- Adding automated tests for this scenario
- Improving error messages for better future debugging
- Adding input validation
- Updating documentation
- Refactoring similar code patterns

Remember: Good debugging is systematic. Don't guess - gather evidence, form hypotheses, test them, and verify fixes.
