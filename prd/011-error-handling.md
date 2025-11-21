# PRD-011: Error Handling and User Feedback

## Purpose
Implement comprehensive error handling throughout the application to provide graceful degradation, clear feedback, and recovery options when things go wrong.

## Requirements

### 1. Error Categories

#### User Input Errors
- Validation failures
- Invalid format (PAN, dates, amounts)
- Missing required fields
- Out-of-range values

#### Database Errors
- IndexedDB initialization failure
- Storage quota exceeded
- Database locked/busy
- Corrupt data
- Browser storage disabled

#### Canvas Errors
- Canvas rendering failures
- Export failures
- Browser doesn't support canvas
- Memory issues with large canvas

#### Download Errors
- Download blocked by browser
- Permission denied
- No storage space
- Unsupported file type

#### Network Errors (Future)
- Offline during sync (post-MVP)
- API failures (post-MVP)

### 2. Error Handling Strategy

#### Error Boundaries
Create `src/components/ErrorBoundary.vue`:
- Catch Vue component errors
- Display fallback UI
- Log errors for debugging
- Provide recovery options

#### Global Error Handler
Configure in `src/main.ts`:
```typescript
app.config.errorHandler = (err, instance, info) => {
  // Log error
  // Show user-friendly message
  // Track in error service (optional)
}
```

### 3. Error UI Components

#### Toast Notification Component
`src/components/ToastNotification.vue`:
- Types: success, error, warning, info
- Auto-dismiss (configurable duration)
- Manual dismiss option
- Stack multiple toasts
- Accessible (aria-live)

Properties:
```typescript
interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number; // milliseconds, 0 = no auto-dismiss
  action?: { label: string; onClick: () => void };
}
```

#### Error Message Component
`src/components/ErrorMessage.vue`:
- Inline error display
- Icon + message
- Contextual (near related input)
- Accessible (role="alert")

### 4. User-Friendly Error Messages

#### Validation Errors
- "Tenant name is required"
- "PAN must follow format AAAAA9999A (e.g., ABCDE1234F)"
- "Rent amount must be greater than 0"
- "Start date must be before end date"
- "Payment date cannot be in the future"

#### Database Errors
- "Unable to save data. Please check browser storage settings."
- "Storage limit reached. Please clear old receipts or browser data."
- "Database initialization failed. Please refresh the page."
- "Storage is disabled. Enable browser storage to use this app."

#### Canvas Errors
- "Unable to generate receipt preview. Please try again."
- "Your browser doesn't support receipt generation. Please use a modern browser."
- "Failed to export receipt. Please try again or use a different browser."

#### Download Errors
- "Download blocked. Please allow downloads in your browser settings."
- "Unable to save file. Please check available storage space."
- "Download failed. Please try again."

### 5. Error Recovery

#### Retry Logic
Create `src/utils/retry.ts`:
```typescript
async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T>
```

#### Graceful Degradation
- If IndexedDB fails, offer in-memory storage with warning
- If canvas fails, show text-based receipt
- If download fails, show manual copy option
- If auto-save fails, show manual save button

#### User Actions
Provide recovery options:
- "Retry" button for failed operations
- "Refresh Page" for critical failures
- "Clear Form" to start over
- "Export as Text" as fallback

### 6. Error Logging

#### Console Logging
```typescript
// src/utils/logger.ts
enum LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR
}

function log(level: LogLevel, message: string, data?: any): void
```

#### Error Context
Log with context:
- Timestamp
- Error type
- User action that triggered error
- Browser/device info
- App state (form data, if relevant)

#### Privacy Considerations
- Don't log sensitive data (PAN numbers, amounts)
- Don't send errors to external services (privacy-first)
- Store logs locally only (optional, for debugging)

### 7. Loading and Processing States

#### Loading Indicators
Create `src/components/LoadingSpinner.vue`:
- Show during async operations
- Sizes: small, medium, large
- Overlay option for full-page loading
- Accessible (aria-busy, aria-label)

#### Processing States
- Saving draft: "Saving..."
- Generating receipt: "Generating receipt..."
- Downloading: "Preparing download..."
- Loading draft: "Loading saved data..."

#### Button States
- Disabled during processing
- Loading spinner on button
- Change text: "Generate Receipt" → "Generating..."

### 8. Offline Handling

#### Offline Detection
```typescript
// src/composables/useOnline.ts
function useOnline() {
  const isOnline = ref(navigator.onLine);
  
  window.addEventListener('online', () => isOnline.value = true);
  window.addEventListener('offline', () => isOnline.value = false);
  
  return { isOnline };
}
```

#### Offline UI
- Show banner when offline: "You're offline. Changes will be saved locally."
- Disable features that require network (none in MVP)
- Assure user: "App works offline"

### 9. Browser Compatibility Checks

#### Feature Detection
```typescript
// src/utils/browserCheck.ts
function checkBrowserSupport(): {
  supported: boolean;
  missingFeatures: string[];
}
```

Check for:
- IndexedDB
- Canvas API
- ES6+ features
- Local Storage (fallback)

#### Unsupported Browser Message
Display warning if critical features missing:
- "Your browser doesn't support this app."
- "Please use Chrome, Firefox, Safari, or Edge."
- List missing features

### 10. Error Analytics (Optional)

#### Local Error Tracking
Store errors locally for user review:
- Error log (max 100 entries)
- View in developer console
- Clear log option
- Export log for bug reports

#### No External Tracking
- Respect privacy: no external analytics
- No error reporting to servers
- All tracking stays local

## Technical References
- **SPEC.md Section 2**: Privacy principle
- **AGENTS.md Section 4**: Client-Side Only, Privacy
- **AGENTS.md Section 5**: Validation requirements

## Acceptance Criteria
- [ ] All errors display user-friendly messages
- [ ] Toast notifications appear for important feedback
- [ ] Inline errors show for validation failures
- [ ] Retry logic works for transient failures
- [ ] Graceful degradation for missing features
- [ ] Loading states show during async operations
- [ ] Offline detection works correctly
- [ ] Browser compatibility check runs on startup
- [ ] Error messages are accessible
- [ ] No sensitive data in error logs
- [ ] Users can recover from all error states
- [ ] Critical errors don't crash the app

## Dependencies
- PRD-000 (Project Setup)
- All feature PRDs (for comprehensive error handling)

## Notes
- Test error scenarios thoroughly
- Simulate errors during testing
- Test on various browsers and devices
- Consider adding "Report Bug" feature (GitHub issue)
- Document common errors and solutions
- User education: tooltips, help text
