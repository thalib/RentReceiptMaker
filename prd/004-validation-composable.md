# PRD-004: Form Validation Composable

## Purpose
Create a reusable composable for client-side form validation to ensure data integrity before saving to database or rendering on canvas.

## Requirements

### 1. Validation Composable
Create `src/composables/useFormValidation.ts`:
- Use VeeValidate or custom validation logic
- Export composable function with validation rules
- Return validation state and error messages
- Support real-time and on-blur validation

### 2. Validation Rules

#### Tenant Name
- **Required**: Must not be empty
- **Min Length**: 2 characters
- **Max Length**: 100 characters
- **Pattern**: Only letters and spaces allowed

#### Landlord Name
- **Required**: Must not be empty
- **Min Length**: 2 characters
- **Max Length**: 100 characters
- **Pattern**: Only letters and spaces allowed

#### Landlord Address
- **Required**: Must not be empty
- **Min Length**: 10 characters
- **Max Length**: 500 characters

#### Landlord PAN Number
- **Required**: Must not be empty
- **Format**: Exactly 10 characters following pattern: AAAAA9999A
  - First 5 characters: Uppercase letters (A-Z)
  - Next 4 characters: Digits (0-9)
  - Last character: Uppercase letter (A-Z)
- **Example**: ABCDE1234F

#### Property Address
- **Required**: Must not be empty
- **Min Length**: 10 characters
- **Max Length**: 500 characters

#### Rent Amount
- **Required**: Must not be empty
- **Type**: Number
- **Min Value**: 1
- **Max Value**: 10,00,00,000 (10 crore)
- **Format**: Positive integer or decimal (max 2 decimal places)

#### Rental Period (Start & End Date)
- **Required**: Both dates must be provided
- **Type**: Valid date
- **Logic**: Start date must be before end date
- **Range**: Reasonable date range (not in far future or distant past)

#### Payment Date
- **Required**: Must not be empty
- **Type**: Valid date
- **Logic**: Should not be before rental period start date
- **Logic**: Should not be too far in the future (warning, not error)

#### Payment Mode
- **Required**: Must select one option
- **Allowed Values**: Cash, Cheque, Online Transfer, UPI

### 3. Validation Functions

#### Core Validation Functions
```typescript
- validateRequired(value: string): boolean
- validateMinLength(value: string, min: number): boolean
- validateMaxLength(value: string, max: number): boolean
- validatePattern(value: string, pattern: RegExp): boolean
- validatePAN(value: string): boolean
- validateNumber(value: number, min?: number, max?: number): boolean
- validateDateRange(start: Date, end: Date): boolean
- validateDateLogic(paymentDate: Date, periodStart: Date): boolean
```

#### Helper Functions
```typescript
- getErrorMessage(field: string, rule: string): string
- isFormValid(formData: ReceiptData): boolean
- getFieldErrors(field: string, value: any): string[]
```

### 4. Error Messages
Provide clear, user-friendly error messages:
- "Tenant name is required"
- "PAN must be in format AAAAA9999A"
- "Rent amount must be greater than 0"
- "Start date must be before end date"
- "Payment date cannot be before rental period"

### 5. Integration
- Export validation schema for VeeValidate
- Provide reactive validation state
- Support field-level and form-level validation
- Allow validation on input, blur, or submit events

## Technical References
- **SPEC.md Section 3.1**: Input requirements
- **AGENTS.md Section 3**: VeeValidate for form validation
- **AGENTS.md Section 5**: Client-side validation requirement
- **AGENTS.md Section 4**: Data integrity

## Acceptance Criteria
- [ ] All validation rules are implemented
- [ ] PAN validation regex works correctly
- [ ] Number validation handles decimals properly
- [ ] Date logic validation works as expected
- [ ] Error messages are clear and helpful
- [ ] Validation composable is reusable
- [ ] Real-time validation works without performance issues
- [ ] Form cannot be submitted with invalid data
- [ ] All edge cases are handled (empty, null, undefined)

## Dependencies
- PRD-000 (Project Setup)
- PRD-002 (Receipt Form)

## Notes
- Consider adding warning messages vs. error messages
- Test validation with various input types
- Ensure validation doesn't block legitimate names (international characters)
- PAN validation is critical for Indian tax compliance
- Consider async validation for future features
