# PRD-007: Auto-Save Draft Functionality

## Purpose
Implement automatic saving of form data to prevent data loss, allowing users to resume their work if they navigate away or close the browser.

## Requirements

### 1. Auto-Save Composable
Create `src/composables/useAutoSave.ts`:
- Watch form data for changes
- Debounce save operations
- Save to RxDB `current_draft` collection
- Provide save status feedback
- Handle errors gracefully

### 2. Auto-Save Behavior

#### Trigger Conditions
- Any form field value changes
- Debounce delay: 500ms after last keystroke
- Save only if form data has changed since last save
- Skip save if form is completely empty

#### Save Process
1. **Detect Change**: Watch Pinia store for updates
2. **Debounce**: Wait 500ms for user to stop typing
3. **Validate Data**: Ensure data is serializable
4. **Save to Database**: Upsert to `current_draft` collection
5. **Update Timestamp**: Set `updatedAt` field
6. **Provide Feedback**: Update UI indicator (optional)

### 3. Draft Data Structure
```typescript
{
  id: 'current_draft',  // Always same ID for single draft
  tenantName: string,
  landlordName: string,
  landlordAddress: string,
  landlordPAN: string,
  rentAmount: number | null,
  rentalPeriodStart: Date | null,
  rentalPeriodEnd: Date | null,
  paymentDate: Date | null,
  propertyAddress: string,
  paymentMode: string,
  updatedAt: Date       // Timestamp of last save
}
```

### 4. Draft Loading

#### On App Mount
1. **Query Database**: Check for existing draft
2. **Load Data**: If draft exists, populate form fields
3. **Restore State**: Set Pinia store values
4. **Validate**: Run validation on loaded data
5. **User Notification**: Optional toast: "Draft restored"

#### Empty Form Handling
- If no draft exists, show empty form
- If draft is very old (>30 days), optionally prompt user
- Provide "Clear Draft" option to start fresh

### 5. Save Status Indicator

#### Visual Feedback
Create `src/components/SaveStatus.vue`:
- Show save status near form or header
- States:
  - "Saving..." (during debounce/save)
  - "Saved" (after successful save)
  - "Error saving" (if save fails)
- Auto-hide after 3 seconds
- Minimal, unobtrusive design

#### Implementation
- Small icon or text indicator
- Fade in/out animations
- Different colors for different states:
  - Gray/Blue: Saving
  - Green: Saved
  - Red: Error

### 6. Error Handling

#### Save Failures
- **Quota Exceeded**: Notify user, suggest clearing old data
- **Database Locked**: Retry after short delay
- **Invalid Data**: Log error, don't clear form
- **Browser Storage Disabled**: Show prominent warning

#### Recovery Strategy
- Retry failed saves (max 3 attempts)
- Keep form data in memory even if save fails
- Allow manual save trigger if auto-save fails

### 7. Draft Management Functions
```typescript
async function saveDraft(formData: DraftData): Promise<void>
async function loadDraft(): Promise<DraftData | null>
async function clearDraft(): Promise<void>
function isDraftStale(updatedAt: Date): boolean
```

### 8. Performance Considerations
- Debounce saves to avoid excessive writes
- Use transaction batching if multiple fields change
- Don't block UI during save operations
- Use async operations throughout
- Optimize serialization of form data

### 9. Privacy and Storage
- Draft stored only in local IndexedDB
- No transmission to any server
- User can manually clear draft anytime
- Draft deleted after successful receipt generation
- Consider adding "Auto-save enabled" setting

## Technical References
- **SPEC.md Section 3.1**: Auto-save requirement
- **SPEC.md Section 3.3**: Local Storage
- **AGENTS.md Section 4**: Offline-First, Privacy
- **README.md**: Auto-Save feature

## Acceptance Criteria
- [ ] Form data saves automatically after 500ms of inactivity
- [ ] Draft loads on page refresh/app mount
- [ ] Save status indicator shows current state
- [ ] Draft persists in IndexedDB correctly
- [ ] Draft loads with correct data types (dates as dates, numbers as numbers)
- [ ] Empty form doesn't create unnecessary drafts
- [ ] Save errors are handled gracefully
- [ ] Performance is smooth (no lag during typing)
- [ ] Draft clears after successful receipt generation
- [ ] Works completely offline

## Dependencies
- PRD-000 (Project Setup)
- PRD-001 (Database Setup)
- PRD-002 (Receipt Form)

## Notes
- Test with slow network (offline mode)
- Test with multiple browser tabs (race conditions)
- Consider debounce delay UX (500ms vs 1000ms)
- Ensure date serialization/deserialization works correctly
- Test with browser storage disabled
- Consider adding manual "Save Draft" button for user confidence
