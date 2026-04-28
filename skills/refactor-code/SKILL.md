---
name: refactor-code
description: Improve code quality by restructuring existing code without changing its external behavior. Use when code is hard to read, maintain, or extend, or when the user asks to clean up, optimize, or modernize code.
version: 1.0.0
user-invocable: true
---

Refactor code to improve readability, maintainability, and performance while preserving behavior.

## Before Refactoring

### Safety Checks

1. **Ensure Tests Exist**:
   - If no tests exist, write characterization tests first
   - Document current behavior before changing anything
   - Verify tests pass before starting

2. **Version Control**:
   - Ensure code is committed to git
   - Make small, incremental commits
   - Consider creating a branch for major refactoring

3. **Define Goals**:
   - What specific problems are you solving?
   - Readability? Performance? Testability?
   - Set clear success criteria

## Refactoring Strategies

### Code Smells to Address

**Long Methods/Functions**:
- Extract smaller methods with descriptive names
- Each method should do one thing
- Aim for methods under 20 lines

**Large Classes/Modules**:
- Extract classes for distinct responsibilities
- Use composition over inheritance
- Apply Single Responsibility Principle

**Duplicate Code**:
- Extract common code into reusable functions
- Create utility modules for shared logic
- Use inheritance or mixins where appropriate

**Long Parameter Lists**:
- Introduce parameter objects
- Use builder pattern for complex construction
- Consider context objects

**Magic Numbers/Strings**:
- Extract constants with descriptive names
- Use enums for related constants
- Move configuration to config files

**Deep Nesting**:
- Use early returns (guard clauses)
- Extract nested logic into methods
- Use polymorphism instead of switch/if-else chains

### Specific Techniques

**Extract Method**:
```javascript
// Before
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const price = item.price * item.quantity;
    const tax = price * 0.1;
    total += price + tax;
  }
  return total;
}

// After
function calculateTotal(items) {
  return items.reduce((total, item) => total + calculateItemTotal(item), 0);
}

function calculateItemTotal(item) {
  const subtotal = item.price * item.quantity;
  const tax = calculateTax(subtotal);
  return subtotal + tax;
}

function calculateTax(amount) {
  return amount * 0.1;
}
```

**Rename Variables**:
- Use descriptive, intention-revealing names
- Avoid abbreviations (except very common ones)
- Use consistent naming conventions

**Simplify Conditionals**:
```javascript
// Before
if (user != null && user.isActive == true && user.role == 'admin') {
  // do something
}

// After
type Role = 'guest' | 'user' | 'moderator' | 'admin';

class User {
  readonly id: string;
  readonly isActive: boolean;
  readonly role: Role;

  constructor(data: { id: string; isActive: boolean; role: Role }) {
    this.id = data.id;
    this.isActive = data.isActive;
    this.role = data.role;
  }
}

class UserPermissions {
  constructor(private readonly user: User) {}

  canPerformAdminAction(): boolean {
    return this.user.isActive && this.user.role === 'admin';
  }

  canModerate(): boolean {
    return this.user.isActive && 
      (this.user.role === 'admin' || this.user.role === 'moderator');
  }

  canDeleteOwnContent(): boolean {
    return this.user.isActive && 
      ['admin', 'moderator', 'user'].includes(this.user.role);
  }
}

// Call site
const user: User | null = fetchUser();

if (user && new UserPermissions(user).canPerformAdminAction()) {
  deletePost(postId);
}
```

**Replace Loop with Pipeline**:
```javascript
// Before
const result = [];
for (let i = 0; i < items.length; i++) {
  if (items[i].active) {
    result.push(items[i].name.toUpperCase());
  }
}

// After
const result = items
  .filter(item => item.active)
  .map(item => item.name.toUpperCase());
```

## Modernization

Update to modern patterns:

**JavaScript/TypeScript**:
- Convert `var` to `const`/`let`
- Use arrow functions where appropriate
- Use destructuring
- Use async/await instead of callbacks
- Don't use optional chaining (`?.`) something in the design is wrong when we use that in the code 
- use nullish coalescing (`??`)

**Python**:
- Use f-strings instead of `.format()` or `%`
- Use list/dict comprehensions
- Use type hints
- Use dataclasses for simple data containers

**Go**:
- Use `any` instead of `interface{}` (Go 1.18+)
- Use generics for type-safe reusable code
- Use `context.Context` for cancellation and timeouts
- Use `errors.Is` and `errors.As` for error handling
- Use `fmt.Errorf` with `%w` verb for error wrapping
- Use `slices` and `maps` packages from stdlib (Go 1.21+)
- Use `slog` for structured logging (Go 1.21+)
- Use `testing.B.Loop` for benchmarks (Go 1.24+)
- Replace `ioutil` with `io` and `os` package functions
- Use `embed` for static assets instead of code generation
- Use `min`, `max`, `clear` built-ins (Go 1.21+)
- Prefer `http.ServeMux` patterns over external routers when possible
- Use `iter.Seq` for iterators (Go 1.23+)

## Performance Improvements

**Algorithm Optimization**:
- Use appropriate data structures (Set vs Array for lookups)
- Cache expensive computations
- Avoid nested loops where possible
- Use memoization for recursive functions

**Resource Management**:
- Close files/connections properly
- Use connection pooling
- Lazy load expensive resources
- Implement proper cleanup

## After Refactoring

### Verification

1. **Run Tests**: Ensure all tests still pass
2. **Check Behavior**: Verify no functional changes
3. **Code Review**: Review changes for clarity
4. **Performance**: Benchmark if performance was a goal

### Documentation

- Update comments if logic changed
- Update README if API changed
- Document any breaking changes
- Note performance improvements

## When NOT to Refactor

- When code works and isn't being changed
- Right before a deadline
- Without tests to verify behavior
- When the cost outweighs the benefit
- During feature development (do it separately)

Remember: Refactoring should make code easier to understand and maintain. If it doesn't, reconsider the approach.
