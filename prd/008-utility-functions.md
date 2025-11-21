# PRD-008: Utility Functions and Helpers

## Purpose
Create reusable utility functions for common operations like currency formatting, date handling, number-to-words conversion, and validation helpers.

## Requirements

### 1. Currency Utilities
Create `src/utils/currency.ts`:

#### Format Currency
```typescript
function formatCurrency(amount: number): string
// Example: 15000 → "₹15,000"
// Example: 150000 → "₹1,50,000"
// Example: 1500000 → "₹15,00,000"
```
- Add ₹ symbol
- Use Indian numbering system (lakhs, crores)
- Format with commas: X,XX,XXX pattern
- Handle decimals: round to 2 decimal places
- Handle edge cases: 0, negative (shouldn't happen), very large numbers

#### Number to Words (Indian System)
```typescript
function numberToWords(amount: number): string
// Example: 15000 → "Fifteen Thousand Only"
// Example: 150000 → "One Lakh Fifty Thousand Only"
// Example: 1500000 → "Fifteen Lakh Only"
```
- Convert to Indian numbering words
- Include: Ones, Tens, Hundreds, Thousands, Lakhs, Crores
- Handle decimals: "and X paise"
- Append "Only" at the end
- Capitalize first letter of each word
- Handle edge cases: 0 → "Zero Only"

### 2. Date Utilities
Create `src/utils/date.ts`:

#### Format Date
```typescript
function formatDate(date: Date, format?: string): string
// Default format: DD-MMM-YYYY (e.g., "15-Jan-2024")
// Alternative: DD/MM/YYYY (e.g., "15/01/2024")
```
- Default to DD-MMM-YYYY format
- Support multiple format options
- Handle invalid dates gracefully
- Use proper month abbreviations (Jan, Feb, Mar, etc.)

#### Parse Date String
```typescript
function parseDate(dateString: string): Date | null
```
- Parse various date formats
- Return null if invalid
- Handle timezone properly (local time)

#### Date Range Formatter
```typescript
function formatDateRange(start: Date, end: Date): string
// Example: "01-Jan-2024 to 31-Jan-2024"
```
- Format date ranges for display
- Handle same month: "01-31 Jan 2024"
- Handle same year: "15 Jan - 15 Feb 2024"

#### Date Validation Helpers
```typescript
function isValidDate(date: any): boolean
function isDateInFuture(date: Date): boolean
function isDateInPast(date: Date): boolean
function getDaysBetween(start: Date, end: Date): number
```

### 3. String Utilities
Create `src/utils/string.ts`:

#### Capitalize
```typescript
function capitalize(text: string): string
function capitalizeWords(text: string): string
```

#### Truncate
```typescript
function truncate(text: string, maxLength: number): string
```

#### Sanitize Input
```typescript
function sanitizeInput(text: string): string
// Remove special characters, trim whitespace
```

#### Slug Generation
```typescript
function generateSlug(text: string): string
// For future filename generation
```

### 4. Validation Helpers
Create `src/utils/validation.ts`:

#### PAN Validation
```typescript
function isValidPAN(pan: string): boolean
// Pattern: AAAAA9999A
```

#### Number Validation
```typescript
function isValidNumber(value: any): boolean
function isPositiveNumber(value: number): boolean
function isInRange(value: number, min: number, max: number): boolean
```

#### String Validation
```typescript
function isEmptyOrWhitespace(value: string): boolean
function hasMinLength(value: string, min: number): boolean
function hasMaxLength(value: string, max: number): boolean
```

### 5. Browser Utilities
Create `src/utils/browser.ts`:

#### Download File
```typescript
function downloadFile(blob: Blob, filename: string): void
```
- Create object URL
- Trigger download via anchor element
- Revoke object URL after download
- Handle cross-browser compatibility

#### Detect Browser Features
```typescript
function supportsIndexedDB(): boolean
function supportsCanvas(): boolean
function supportsDownload(): boolean
```

#### Local Storage Check
```typescript
function isStorageAvailable(): boolean
function getStorageQuota(): Promise<{ usage: number; quota: number }>
```

### 6. Type Guards
Create `src/utils/typeGuards.ts`:

```typescript
function isString(value: any): value is string
function isNumber(value: any): value is number
function isDate(value: any): value is Date
function isDefined<T>(value: T | undefined | null): value is T
```

### 7. Constants
Create `src/utils/constants.ts`:

```typescript
export const PAYMENT_MODES = ['Cash', 'Cheque', 'Online Transfer', 'UPI'] as const;
export const RECEIPT_PREFIX = 'RR';
export const DATE_FORMAT = 'DD-MMM-YYYY';
export const CURRENCY_SYMBOL = '₹';
export const MIN_RENT_AMOUNT = 1;
export const MAX_RENT_AMOUNT = 100000000; // 10 crore
export const REVENUE_STAMP_THRESHOLD = 5000;
export const AUTO_SAVE_DEBOUNCE = 500; // milliseconds
export const CANVAS_REDRAW_DEBOUNCE = 100; // milliseconds
```

### 8. Error Handling Utilities
Create `src/utils/errors.ts`:

```typescript
class ReceiptError extends Error {
  constructor(message: string, public code: string) {
    super(message);
  }
}

function handleError(error: unknown): string
// Convert any error to user-friendly message
```

## Technical References
- **SPEC.md Section 3.1**: Field requirements
- **SPEC.md Section 3.3**: Download functionality
- **AGENTS.md Section 5**: Validation requirements

## Acceptance Criteria
- [ ] Currency formatting follows Indian numbering system
- [ ] Number to words handles lakhs and crores correctly
- [ ] Date formatting is consistent across app
- [ ] PAN validation regex is accurate
- [ ] Download function works on all major browsers
- [ ] All utilities have proper TypeScript types
- [ ] Edge cases are handled (null, undefined, empty)
- [ ] All functions are pure (no side effects)
- [ ] Utilities are well-tested
- [ ] Constants are used throughout app

## Dependencies
- PRD-000 (Project Setup)

## Notes
- Create comprehensive unit tests for utilities
- Document each function with JSDoc comments
- Consider using established libraries for complex operations
- Ensure number-to-words handles edge cases (teens, hundreds)
- Test currency formatting with various amounts
- Indian numbering system is critical (lakhs, crores)
