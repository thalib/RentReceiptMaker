# PRD-009: Accessibility and User Experience Enhancements

## Purpose
Ensure the application is accessible to all users, including those using assistive technologies, and provide an excellent user experience through proper semantics, keyboard navigation, and feedback.

## Requirements

### 1. Semantic HTML

#### Structure
- Use proper HTML5 semantic elements
- `<header>`, `<main>`, `<section>`, `<form>`, `<footer>`
- Avoid excessive `<div>` nesting
- Use `<label>` for all form inputs
- Use `<button>` for actions (not `<div>` or `<a>`)

#### Document Structure
```html
<div id="app">
  <header role="banner">
    <h1>Rent Receipt Generator</h1>
  </header>
  <main role="main">
    <section aria-label="Receipt Form">
      <form>...</form>
    </section>
    <section aria-label="Receipt Preview">
      <canvas>...</canvas>
    </section>
  </main>
</div>
```

### 2. ARIA Labels and Roles

#### Form Fields
- Every input must have associated `<label>` with `for` attribute
- Use `aria-required="true"` for required fields
- Use `aria-invalid="true"` when validation fails
- Use `aria-describedby` to link inputs with error messages

#### Interactive Elements
- Buttons: Descriptive text or `aria-label`
- Canvas: `aria-label="Receipt preview"`
- Status messages: `role="status"` or `aria-live="polite"`

#### Example
```html
<label for="tenant-name">Tenant Name *</label>
<input
  id="tenant-name"
  type="text"
  aria-required="true"
  aria-invalid="false"
  aria-describedby="tenant-name-error"
/>
<span id="tenant-name-error" role="alert">
  <!-- Error message -->
</span>
```

### 3. Keyboard Navigation

#### Tab Order
- Logical tab order through form fields
- All interactive elements reachable via keyboard
- Visible focus indicators (outline or border)
- Skip to content link (optional)

#### Keyboard Shortcuts
- `Tab`: Move to next field
- `Shift + Tab`: Move to previous field
- `Enter`: Submit form (on form submission)
- `Escape`: Close modals/dialogs (if any)

#### Focus Management
- Focus on first input on page load
- Focus on error field after validation failure
- Return focus after modal close
- Don't trap focus unintentionally

### 4. Visual Accessibility

#### Color Contrast
- WCAG AA compliance (4.5:1 for normal text)
- Text: Dark gray/black on white/light background
- Links: Sufficient contrast, underlined
- Error messages: Red with good contrast
- Success messages: Green with good contrast

#### Typography
- Base font size: 16px minimum
- Line height: 1.5 for body text
- Font family: Sans-serif, readable (Inter, Roboto, system font)
- Responsive text sizing

#### Focus Indicators
- Visible focus outline on all interactive elements
- Custom focus styles with Tailwind: `focus:ring-2 focus:ring-blue-500`
- Don't remove outline without replacement

### 5. Screen Reader Support

#### Form Instructions
- Provide clear instructions at top of form
- Explain required fields
- Describe format requirements (e.g., PAN format)

#### Status Messages
- Use `aria-live` regions for dynamic updates
- Announce save status
- Announce validation errors
- Announce successful generation

#### Canvas Alternative
- Provide `aria-label` describing canvas content
- Consider adding hidden text description of receipt
- Future: Provide downloadable text version

### 6. Error Handling and Feedback

#### Validation Errors
- Display errors inline below fields
- Use `role="alert"` for critical errors
- Provide specific, actionable messages
- Don't just use color to indicate errors

#### Success Messages
Create `src/components/ToastNotification.vue`:
- Show toast for successful actions
- Auto-dismiss after 3-5 seconds
- Position: Top-right or bottom-center
- Accessible with `role="status"`
- Keyboard dismissible

#### Loading States
- Show loading indicator during save/generation
- Disable buttons during processing
- Use `aria-busy="true"` on loading elements
- Provide text alternative: "Generating receipt..."

### 7. Form UX Enhancements

#### Input Helpers
- Placeholder text with examples
- Helper text below inputs (e.g., "Format: AAAAA9999A")
- Character counter for limited fields (optional)
- Input masks for formatted fields (PAN, dates)

#### Clear Visual Hierarchy
- Group related fields with subtle borders/spacing
- Use headings for sections (Tenant Info, Payment Info)
- Adequate whitespace between elements
- Visual distinction between sections

#### Progressive Disclosure
- Show receipt number after generation
- Show download button only when receipt is ready
- Hide/show sections based on state (future)

### 8. Mobile Accessibility

#### Touch Targets
- Minimum size: 44x44px for all interactive elements
- Adequate spacing between touch targets
- Larger buttons on mobile

#### Mobile Navigation
- Easy thumb reach for primary actions
- Avoid small tap targets
- Test on real mobile devices

#### Input Types
- Use proper input types for mobile keyboards
  - `type="number"` for rent amount
  - `type="date"` for dates
  - `type="email"` (if email added in future)

### 9. Performance and UX

#### Loading Experience
- Show app shell quickly
- Load draft in background
- Progressive enhancement

#### Smooth Interactions
- Transitions for state changes (CSS transitions)
- Debounced auto-save (no lag)
- Smooth scrolling on navigation
- No jarring updates or reflows

### 10. Testing Requirements

#### Manual Testing
- Test with keyboard only (no mouse)
- Test with screen reader (NVDA, JAWS, VoiceOver)
- Test on mobile devices
- Test with browser zoom (200%)

#### Automated Testing
- Use axe-core or similar tool
- Test color contrast
- Validate ARIA attributes
- Check heading hierarchy

## Technical References
- **SPEC.md Section 2**: Core Principles (Simplicity)
- **SPEC.md Section 5**: Mobile-First
- **AGENTS.md Section 4**: Mobile-First Design
- **AGENTS.md Section 5**: Component Design

## Acceptance Criteria
- [ ] All form inputs have associated labels
- [ ] Tab order is logical and intuitive
- [ ] Focus indicators are visible on all interactive elements
- [ ] Color contrast meets WCAG AA standards
- [ ] Screen reader announces all important updates
- [ ] Error messages are clear and specific
- [ ] App is fully keyboard navigable
- [ ] Touch targets are minimum 44x44px on mobile
- [ ] Status messages use aria-live regions
- [ ] Form passes automated accessibility audit
- [ ] Manual keyboard testing successful
- [ ] Manual screen reader testing successful

## Dependencies
- PRD-002 (Receipt Form)
- PRD-005 (Responsive Layout)

## Notes
- Accessibility is not optional—critical for MVP
- Test with real assistive technologies
- Consider hiring accessibility consultant
- Document accessibility features in README
- Regular accessibility audits
- Train team on accessibility best practices
