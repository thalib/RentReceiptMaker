# PRD-002: Receipt Generation Form Component

## Purpose
Build the primary data input form for collecting all information required to generate a rent receipt, with auto-save functionality and validation.

## Requirements

### 1. Form Component Structure
Create `src/components/ReceiptForm.vue`:
- Use Vue 3 Composition API with `<script setup>`
- Implement single-column layout for mobile-first design
- Use Tailwind CSS for styling
- Organize fields in logical groups

### 2. Input Fields
Implement the following form inputs:

#### Tenant Information
- **Tenant Name**: Text input, required

#### Landlord Information
- **Landlord Name**: Text input, required
- **Landlord Address**: Textarea, required
- **Landlord PAN Number**: Text input, required, format: AAAAA9999A

#### Property Information
- **Property Address**: Textarea, required

#### Payment Information
- **Rent Amount (₹)**: Number input, required, min: 1
- **Rental Period**: Date range picker (start & end dates), required
- **Payment Date**: Date input, required
- **Payment Mode**: Dropdown/Select with options:
  - Cash
  - Cheque
  - Online Transfer
  - UPI

### 3. Auto-Generated Fields
Display (read-only):
- **Receipt Number**: Auto-generated as `RR-YYYY-NNN`
- Format: RR-[current year]-[sequential number]

### 4. Form Behavior

#### Input Enhancement
- Clear labels for all fields
- Placeholder text for guidance
- Helper text for PAN format and revenue stamp rules
- Proper input types (text, number, date, select)
- Accessible form controls with proper ARIA labels

#### Auto-Save to Draft
- Debounce input changes (500ms)
- Save form state to RxDB `current_draft` collection
- Load draft data on component mount
- No explicit "Save Draft" button needed

#### Validation
- Use VeeValidate or custom validation composable
- Validate required fields
- Validate PAN format (AAAAA9999A pattern)
- Validate rent amount (positive number)
- Validate date logic (payment date should be reasonable)
- Show validation errors inline below fields
- Prevent form submission if invalid

### 5. State Management
Create `src/stores/receiptStore.ts` (Pinia):
- Store current form data
- Provide computed properties for validation state
- Actions to update form fields
- Action to clear form
- Action to load draft from database

### 6. Form Actions
Include buttons:
- **Clear Form**: Reset all fields, confirm with user
- **Generate Receipt**: Trigger receipt generation (handled by parent)
- Disable "Generate" if form is invalid

## Technical References
- **SPEC.md Section 3.1**: Receipt Generation Form
- **SPEC.md Section 5**: Mobile-first layout
- **AGENTS.md Section 3**: Vue 3 Composition API, Pinia, VeeValidate
- **AGENTS.md Section 5**: Component design principles

## Acceptance Criteria
- [ ] All required input fields are present and functional
- [ ] Form displays in single-column layout on mobile
- [ ] PAN number validation works correctly
- [ ] Form auto-saves to RxDB every 500ms after changes
- [ ] Draft data loads on page refresh
- [ ] Receipt number generates correctly
- [ ] Validation errors display inline
- [ ] Form is keyboard accessible
- [ ] Clear form action works with confirmation
- [ ] Generate button disabled when form invalid

## Dependencies
- PRD-000 (Project Setup)
- PRD-001 (Database Setup)

## Notes
- Consider adding input masks for PAN number
- Ensure date pickers are mobile-friendly
- Test auto-save thoroughly to avoid data loss
- Form should be responsive but mobile-first
