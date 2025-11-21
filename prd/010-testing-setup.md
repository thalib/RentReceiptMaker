# PRD-010: Testing Setup and Test Suites

## Purpose
Establish comprehensive testing infrastructure with unit, integration, and end-to-end tests to ensure code quality, reliability, and prevent regressions.

## Requirements

### 1. Testing Framework Setup

#### Vitest Configuration
- Configure Vitest for Vue 3 components
- Set up test environment (jsdom for browser APIs)
- Configure coverage reporting (Istanbul/c8)
- Set up test scripts in package.json

#### Vue Test Utils
- Install @vue/test-utils for component testing
- Configure component mounting utilities
- Set up mock stores and composables

#### Testing Files Structure
```
src/
├── components/
│   ├── ReceiptForm.vue
│   └── ReceiptForm.spec.ts
├── composables/
│   ├── useDatabase.ts
│   └── useDatabase.spec.ts
├── utils/
│   ├── currency.ts
│   └── currency.spec.ts
└── stores/
    ├── receiptStore.ts
    └── receiptStore.spec.ts
```

### 2. Unit Tests

#### Utility Functions (src/utils/)
Test `currency.ts`:
- `formatCurrency()`: Test Indian numbering, edge cases
- `numberToWords()`: Test all number ranges, decimals

Test `date.ts`:
- `formatDate()`: Various formats, invalid dates
- `formatDateRange()`: Same month, year, different years
- Validation helpers: Past, future, range checks

Test `validation.ts`:
- `isValidPAN()`: Valid and invalid patterns
- Number validators: Range, positive, type checks
- String validators: Empty, length checks

#### Composables
Test `useFormValidation.ts`:
- Each validation rule independently
- Combined validation logic
- Error message generation
- Form-level validation

Test `useReceiptGeneration.ts`:
- Receipt number generation logic
- Sequential numbering per year
- Year rollover handling

Test `useAutoSave.ts`:
- Debounce behavior
- Save trigger conditions
- Error handling

### 3. Component Tests

#### ReceiptForm.vue
```typescript
describe('ReceiptForm', () => {
  it('renders all form fields', () => {})
  it('loads draft on mount', () => {})
  it('validates required fields', () => {})
  it('shows error messages for invalid input', () => {})
  it('auto-saves after input changes', () => {})
  it('disables generate button when invalid', () => {})
  it('clears form on clear action', () => {})
  it('emits generate event with valid data', () => {})
})
```

#### ReceiptCanvas.vue
```typescript
describe('ReceiptCanvas', () => {
  it('renders canvas element', () => {})
  it('draws receipt with form data', () => {})
  it('updates canvas on data change', () => {})
  it('maintains aspect ratio', () => {})
  it('exports high-quality PNG', () => {})
  it('handles empty fields gracefully', () => {})
})
```

#### ActionButtons.vue
```typescript
describe('ActionButtons', () => {
  it('renders all buttons', () => {})
  it('disables generate button initially', () => {})
  it('enables download after generation', () => {})
  it('shows confirmation on clear', () => {})
  it('handles button clicks correctly', () => {})
})
```

### 4. Store Tests

#### receiptStore.ts
```typescript
describe('receiptStore', () => {
  it('initializes with empty state', () => {})
  it('updates form field values', () => {})
  it('validates form data', () => {})
  it('clears form state', () => {})
  it('computes validation state correctly', () => {})
  it('loads draft data', () => {})
})
```

### 5. Integration Tests

#### Form to Canvas Integration
```typescript
describe('Form to Canvas Integration', () => {
  it('updates canvas when form data changes', () => {})
  it('reflects all form fields on canvas', () => {})
  it('formats currency correctly on canvas', () => {})
  it('formats dates correctly on canvas', () => {})
})
```

#### Form to Database Integration
```typescript
describe('Form to Database Integration', () => {
  it('saves draft to database', () => {})
  it('loads draft from database', () => {})
  it('saves receipt to database', () => {})
  it('generates unique receipt numbers', () => {})
})
```

#### Receipt Generation Flow
```typescript
describe('Receipt Generation Flow', () => {
  it('validates form before generation', () => {})
  it('generates receipt number', () => {})
  it('renders canvas', () => {})
  it('saves to database', () => {})
  it('triggers download', () => {})
  it('clears draft after generation', () => {})
  it('handles errors gracefully', () => {})
})
```

### 6. Database Tests

#### RxDB Setup
- Mock IndexedDB for testing
- Test database initialization
- Test schema validation
- Test CRUD operations

#### Test Cases
```typescript
describe('Database Operations', () => {
  it('initializes database successfully', () => {})
  it('saves draft data', () => {})
  it('retrieves draft data', () => {})
  it('updates existing draft', () => {})
  it('saves receipt with unique ID', () => {})
  it('queries receipts by year', () => {})
  it('handles database errors', () => {})
})
```

### 7. Accessibility Tests

#### Automated A11y Testing
```typescript
import { axe } from 'vitest-axe';

describe('Accessibility', () => {
  it('has no accessibility violations in form', async () => {
    const { container } = render(ReceiptForm);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  })
})
```

### 8. Test Coverage Goals

#### Minimum Coverage Targets
- Overall: 80% coverage
- Utilities: 95% coverage (critical logic)
- Composables: 85% coverage
- Components: 75% coverage
- Stores: 90% coverage

#### Coverage Reports
- Generate HTML coverage report
- Integrate with CI/CD (future)
- Track coverage over time

### 9. Mock and Test Utilities

#### Create Test Helpers
`src/test-utils/mocks.ts`:
```typescript
export function mockReceiptData(): ReceiptData
export function mockDraftData(): DraftData
export function mockDatabase(): MockDatabase
export function mockCanvas(): HTMLCanvasElement
```

`src/test-utils/helpers.ts`:
```typescript
export function mountWithStore(component: Component, options?: MountOptions)
export function waitForAsync()
export function flushPromises()
```

### 10. Test Scripts

#### package.json
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:watch": "vitest --watch"
  }
}
```

## Technical References
- **AGENTS.md Section 3**: Vitest/Jest with Vue Test Utils
- **AGENTS.md Section 6**: Testing requirements
- **SPEC.md**: All functional requirements

## Acceptance Criteria
- [ ] Vitest is configured and runs successfully
- [ ] All utility functions have unit tests
- [ ] All composables have unit tests
- [ ] All components have component tests
- [ ] Store has comprehensive tests
- [ ] Integration tests cover critical flows
- [ ] Database operations are tested
- [ ] Accessibility tests are in place
- [ ] Test coverage meets minimum targets
- [ ] All tests pass consistently
- [ ] Mock utilities are available
- [ ] Test documentation is clear

## Dependencies
- PRD-000 (Project Setup)
- All other PRDs (for comprehensive testing)

## Notes
- Write tests alongside feature development (TDD preferred)
- Mock external dependencies (database, canvas APIs)
- Test edge cases and error conditions
- Keep tests fast (mock slow operations)
- Use meaningful test descriptions
- Organize tests logically
- Run tests in CI/CD pipeline
- Update tests when features change
