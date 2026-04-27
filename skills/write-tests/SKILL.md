---
name: write-tests
description: Create comprehensive test suites for code. Use when the user needs tests written, wants to improve test coverage, or asks for help with testing strategies.
version: 1.0.0
user-invocable: true
---

Write tests that verify code behavior, catch regressions, and document expected functionality.

## Test Planning

### Identify What to Test

**Happy Path**:
- Normal expected usage
- Typical inputs
- Standard workflows

**Edge Cases**:
- Empty inputs
- Null/undefined values
- Boundary values (0, max, min)
- Very large inputs
- Special characters

**Error Cases**:
- Invalid inputs
- Missing required parameters
- Network failures
- Resource unavailability
- Timeout scenarios

**Integration Points**:
- API boundaries
- Database interactions
- File system operations
- External service calls

## Test Structure

### Arrange-Act-Assert Pattern

```javascript
describe('calculateTotal', () => {
  it('should calculate total with tax', () => {
    // Arrange
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 1 }
    ];
    const taxRate = 0.1;
    
    // Act
    const result = calculateTotal(items, taxRate);
    
    // Assert
    expect(result).toBe(27.5); // (20 + 5) * 1.1
  });
});
```

### Test Naming Conventions

**Descriptive Names**:
- `it('should calculate total with tax')`
- `it('should throw error for negative price')`
- `it('should handle empty cart')`
- `it('should apply discount for premium users')`

**Avoid**:
- `it('works')`
- `it('test1')`
- `it('foo')`

## Testing Strategies

### Unit Tests

Test individual functions/components in isolation:

```javascript
// Function to test
function divide(a, b) {
  if (b === 0) throw new Error('Cannot divide by zero');
  return a / b;
}

// Tests
describe('divide', () => {
  it('should divide two positive numbers', () => {
    expect(divide(10, 2)).toBe(5);
  });
  
  it('should handle negative numbers', () => {
    expect(divide(-10, 2)).toBe(-5);
  });
  
  it('should throw error when dividing by zero', () => {
    expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
  });
  
  it('should return decimal result', () => {
    expect(divide(10, 3)).toBeCloseTo(3.333, 3);
  });
});
```

### Integration Tests

Test component interactions:

```javascript
describe('UserService', () => {
  it('should create user and send welcome email', async () => {
    const userService = new UserService(emailService);
    
    const user = await userService.createUser({
      email: 'test@example.com',
      name: 'Test User'
    });
    
    expect(user.id).toBeDefined();
    expect(emailService.sendWelcome).toHaveBeenCalledWith('test@example.com');
  });
});
```

### Mocking

**Mock External Dependencies**:
```javascript
import { vi } from 'vitest';

// Mock database
vi.mock('./db', () => ({
  query: vi.fn()
}));

// Mock API calls
vi.mock('axios', () => ({
  get: vi.fn()
}));

// Mock timers
vi.useFakeTimers();
```

**Spy on Methods**:
```javascript
import { vi } from 'vitest';

const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
// ... run code
expect(spy).toHaveBeenCalledWith('Expected error message');
spy.mockRestore();
```

### Snapshot Tests

Use for UI components or complex objects:

```javascript
it('should render correctly', () => {
  const tree = renderer.create(<MyComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});
```

## Test Data & Mock Data Generation

### When to Use Mocks vs Real Test Databases

**Use In-Memory/Stub Mocks for**:
- Unit tests (fast, isolated)
- External API dependencies (don’t test the real service)
- Deterministic assertions (no side effects)

**Use a Real Test Database for**:
- Integration tests that verify query logic
- Database schema migration tests
- Transaction/rollback behavior tests
- Repository/DAO layer tests

### Generating Mock Data

**Factories with Faker**:
```javascript
import { faker } from '@faker-js/faker';

function createMockUser(overrides = {}) {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(['user', 'admin']),
    createdAt: faker.date.past(),
    ...overrides
  };
}

// Usage in tests
const admin = createMockUser({ role: 'admin' });
const users = faker.helpers.multiple(createMockUser, { count: 5 });
```

**Seeding a Test Database**:
```javascript
// vitest + postgres (example)
import { beforeAll, afterAll } from 'vitest';
import { createTestDb, runMigrations, truncateAllTables } from './test-utils';

let db;

beforeAll(async () => {
  db = await createTestDb(); // spins up a temporary postgres instance
  await runMigrations(db);
});

afterAll(async () => {
  await db?.destroy();
});

beforeEach(async () => {
  await truncateAllTables(db);
  await db.insertInto('users').values(createMockUser({ email: 'test@example.com' })).execute();
});
```

**Using testcontainers for ephemeral databases**:
```javascript
import { PostgreSqlContainer } from '@testcontainers/postgresql';

const container = await new PostgreSqlContainer().start();
const connectionString = container.getConnectionUri();
// run migrations + seed data
// teardown with container.stop()
```

**Python equivalent with factory_boy + pytest**:
```python
import factory
from myapp.models import User

class UserFactory(factory.Factory):
    class Meta:
        model = User
    name = factory.Faker('name')
    email = factory.Faker('email')
    role = factory.Iterator(['user', 'admin'])

# In tests
@pytest.fixture
def admin_user(db):
    return UserFactory(role='admin')
```

## Test Coverage

### What to Cover

**Minimum Coverage Goals**:
- Critical business logic: 100%
- Utility functions: 100%
- API endpoints: 100%
- UI components: 80%+
- Configuration/setup: Optional

**Coverage Tools**:
- JavaScript: Vitest with `--coverage` (via `@vitest/coverage-v8`)
- Python: pytest-cov
- Java: JaCoCo
- Go: Built-in `go test -cover`

## Framework-Specific Examples

### Vitest (JavaScript)

```javascript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { sum, asyncFetch } from './utils';

describe('Utils', () => {
  beforeEach(() => {
    // Setup before each test
  });
  
  afterEach(() => {
    // Cleanup after each test
    vi.clearAllMocks();
  });
  
  it('should sum numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });
  
  it('should fetch data', async () => {
    const data = await asyncFetch('/api/users');
    expect(data).toHaveProperty('users');
  });
});
```

### pytest (Python)

```python
import pytest
from my_module import calculate_area

class TestCalculateArea:
    def test_rectangle(self):
        assert calculate_area(4, 5) == 20
    
    def test_square(self):
        assert calculate_area(5, 5) == 25
    
    def test_invalid_input(self):
        with pytest.raises(ValueError):
            calculate_area(-1, 5)
    
    @pytest.mark.parametrize("width,height,expected", [
        (2, 3, 6),
        (0, 5, 0),
        (4, 4, 16),
    ])
    def test_multiple_cases(self, width, height, expected):
        assert calculate_area(width, height) == expected
```

### Go (testing)

```go
package calculator

import (
	"testing"
)

func TestAdd(t *testing.T) {
	calc := NewCalculator()
	
	result := calc.Add(2, 3)
	if result != 5 {
		t.Errorf("Add(2, 3) = %d; want 5", result)
	}
}

func TestDivide(t *testing.T) {
	calc := NewCalculator()
	
	_, err := calc.Divide(10, 0)
	if err == nil {
		t.Error("Divide(10, 0) expected error, got nil")
	}
}

func TestAddMultipleCases(t *testing.T) {
	calc := NewCalculator()
	
	tests := []struct {
		a, b, expected int
	}{
		{1, 1, 2},
		{2, 3, 5},
		{10, 20, 30},
	}
	
	for _, tt := range tests {
		result := calc.Add(tt.a, tt.b)
		if result != tt.expected {
			t.Errorf("Add(%d, %d) = %d; want %d", tt.a, tt.b, result, tt.expected)
		}
	}
}
```

## Best Practices

1. **Fast**: Tests should run quickly (< 10ms each ideally)
2. **Isolated**: Tests shouldn't depend on each other
3. **Repeatable**: Same input should always produce same output
4. **Self-Validating**: Pass/fail should be obvious
5. **Timely**: Write tests before or alongside code

## Common Mistakes

- Testing implementation details instead of behavior
- Not cleaning up after tests (leaking state)
- Testing multiple things in one test
- Ignoring error cases
- Over-mocking (testing mocks instead of code)
- Brittle tests that break on minor changes

Remember: Tests are documentation. They should clearly show what the code is supposed to do and protect against future changes breaking functionality.
