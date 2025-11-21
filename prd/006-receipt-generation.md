# PRD-006: Receipt Generation and Download Logic

## Purpose
Implement the core logic to generate a complete receipt, save it to the database, and provide download functionality as a high-quality PNG image.

## Requirements

### 1. Receipt Generation Flow
Create `src/composables/useReceiptGeneration.ts`:
- Validate all form data before generation
- Generate unique receipt number
- Save receipt to database
- Trigger canvas export
- Provide success/error feedback

### 2. Receipt Number Generation

#### Format
`RR-YYYY-NNN`
- **RR**: Prefix (Rent Receipt)
- **YYYY**: Current year (4 digits)
- **NNN**: Sequential number, zero-padded to 3 digits

#### Logic
- Query database for receipts in current year
- Find highest number for current year
- Increment by 1
- If first receipt of year, start at 001
- Handle concurrent generation (rare but possible)

#### Examples
- First receipt of 2024: `RR-2024-001`
- 15th receipt of 2024: `RR-2024-015`
- 100th receipt of 2024: `RR-2024-100`

### 3. Generate Receipt Action

#### Process Flow
1. **Validate Form**: Check all fields are valid
2. **Generate Receipt Number**: Create unique number
3. **Create Receipt Object**: Combine all form data
4. **Render Canvas**: Ensure canvas is up-to-date
5. **Export Canvas**: Generate high-quality PNG
6. **Save to Database**: Store receipt in `receipts` collection
7. **Clear Draft**: Remove current_draft from database (optional)
8. **Trigger Download**: Automatically download PNG
9. **Show Success Message**: Confirm to user
10. **Reset Form**: Option to create new receipt

#### Error Handling
- Validation errors: Show field-specific messages
- Database errors: Notify user, don't clear form
- Canvas export errors: Retry or notify user
- Download errors: Provide fallback method

### 4. PNG Export Functionality

#### Canvas Export
- Render canvas at high resolution (minimum 1240x1754px for A4)
- Export as PNG with quality settings
- Generate blob from canvas using `toBlob()`
- Create object URL for download

#### Download Mechanism
```typescript
function downloadReceipt(blob: Blob, receiptNumber: string, date: Date) {
  const filename = `Receipt-${receiptNumber}-${formatDate(date)}.png`;
  // Trigger browser download
}
```

#### Filename Format
`Receipt-[Receipt Number]-[Date].png`
- Example: `Receipt-RR-2024-001-2024-01-15.png`

### 5. Success States and Feedback

#### After Generation
- Show success toast/notification
- Display receipt number prominently
- Enable "Download Again" option
- Provide "Create New Receipt" action
- Update button states

#### Download Confirmation
- Visual feedback during download
- Success message after download starts
- Option to download again
- Link to view saved receipts (future feature)

### 6. Database Operations
Create `src/composables/useSaveReceipt.ts`:
```typescript
async function saveReceipt(receiptData: ReceiptData): Promise<string>
async function getReceiptById(id: string): Promise<Receipt | null>
async function clearDraft(): Promise<void>
async function getNextReceiptNumber(): Promise<string>
```

### 7. Form Reset After Generation
- Clear all form fields
- Reset validation state
- Delete current draft from database
- Focus on first input field
- Confirm action before clearing

## Technical References
- **SPEC.md Section 3.1**: Auto-Generated Receipt Number
- **SPEC.md Section 3.3**: Download and Storage
- **SPEC.md Section 4**: Application Architecture
- **AGENTS.md Section 4**: Client-Side Only, Offline-First

## Acceptance Criteria
- [ ] Receipt number generates correctly and sequentially
- [ ] Receipt number increments per year correctly
- [ ] Validation prevents invalid receipt generation
- [ ] Canvas exports as high-quality PNG
- [ ] Download triggers automatically after generation
- [ ] Filename includes receipt number and date
- [ ] Receipt saves to database successfully
- [ ] Success message displays after generation
- [ ] Form resets cleanly after generation
- [ ] Draft clears after successful generation
- [ ] Error handling works for all failure cases
- [ ] Process works completely offline

## Dependencies
- PRD-000 (Project Setup)
- PRD-001 (Database Setup)
- PRD-002 (Receipt Form)
- PRD-003 (Receipt Canvas)
- PRD-004 (Validation)

## Notes
- Consider adding "Save without Download" option
- Test with large receipt numbers (>999)
- Ensure downloads work on iOS Safari (tricky)
- Consider adding print functionality in future
- Test offline generation thoroughly
- Handle browser download permission denials gracefully
