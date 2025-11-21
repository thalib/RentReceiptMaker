# PRD-005: Responsive Layout and UI Structure

## Purpose
Implement the main application layout that adapts between mobile and desktop views, providing optimal user experience across all device sizes.

## Requirements

### 1. Main App Component
Update `src/App.vue`:
- Implement responsive container
- Use Tailwind CSS breakpoints
- Handle layout switching based on screen size
- Ensure proper component composition

### 2. Layout Breakpoints
Define responsive behavior:
- **Mobile (<768px)**: Single-column vertical layout
- **Desktop (≥768px)**: Two-column split-screen layout

### 3. Mobile Layout (<768px)

#### Structure
```
┌─────────────────────┐
│      Header         │
├─────────────────────┤
│                     │
│   Receipt Form      │
│   (Full Width)      │
│                     │
├─────────────────────┤
│                     │
│   Receipt Preview   │
│   (Canvas)          │
│                     │
├─────────────────────┤
│   Action Buttons    │
└─────────────────────┘
```

#### Specifications
- Form appears first (above the fold)
- Preview appears below form (scroll to view)
- Full-width components with padding
- Stack elements vertically
- Touch-friendly button sizes (min 44x44px)
- Adequate spacing between sections

### 4. Desktop Layout (≥768px)

#### Structure
```
┌──────────────┬────────────────────────┐
│    Header (Full Width)                │
├──────────────┼────────────────────────┤
│              │                        │
│   Form       │    Receipt Preview     │
│   (40%)      │    (Canvas - 60%)      │
│              │                        │
│              │                        │
│   Scrollable │    Sticky/Fixed        │
│              │                        │
│              │                        │
├──────────────┴────────────────────────┤
│         Action Buttons                │
└───────────────────────────────────────┘
```

#### Specifications
- Left pane: Form (approx. 40% width, scrollable)
- Right pane: Preview (approx. 60% width, sticky on scroll)
- Preview stays visible while scrolling form
- Use CSS Grid or Flexbox for layout
- Maintain aspect ratio of canvas

### 5. Header Component
Create `src/components/AppHeader.vue`:
- App title: "Rent Receipt Generator"
- Tagline/subtitle (optional): "Free • Offline • Private"
- Logo/icon (optional)
- Responsive typography
- Minimal, clean design

### 6. Action Buttons Section
Create `src/components/ActionButtons.vue`:
- **Generate Receipt**: Primary action button
- **Download PNG**: Secondary action (enabled after generation)
- **Clear Form**: Tertiary action with confirmation
- Responsive button layout:
  - Mobile: Stack vertically, full width
  - Desktop: Horizontal row, right-aligned
- Appropriate button states (disabled, loading)

### 7. Styling Guidelines
Using Tailwind CSS:
- Consistent spacing (padding, margins)
- Mobile-first approach (base styles for mobile, then `md:` for desktop)
- Color scheme: Clean and professional
  - Primary: Blue or teal for actions
  - Background: White or light gray
  - Text: Dark gray/black
- Typography hierarchy
- Proper contrast ratios (WCAG AA compliance)

### 8. Responsive Utilities
Create `src/composables/useResponsive.ts`:
- Detect current breakpoint
- Provide reactive width/height values
- Export computed properties: `isMobile`, `isDesktop`, `isTablet`
- Use window resize listener with debounce

## Technical References
- **SPEC.md Section 5**: Layout & Responsiveness
- **SPEC.md Section 2**: Mobile-First principle
- **AGENTS.md Section 3**: Tailwind CSS
- **AGENTS.md Section 4**: Mobile-First Design

## Acceptance Criteria
- [ ] Layout switches correctly at 768px breakpoint
- [ ] Mobile layout displays vertically with proper spacing
- [ ] Desktop layout shows form and preview side-by-side
- [ ] Preview stays sticky on desktop while scrolling form
- [ ] All components are touch-friendly on mobile
- [ ] Typography scales appropriately
- [ ] No horizontal scrolling on any screen size
- [ ] Layout works on screens from 320px to 2560px width
- [ ] Buttons are appropriately sized and positioned
- [ ] Visual hierarchy is clear on both layouts

## Dependencies
- PRD-000 (Project Setup)
- PRD-002 (Receipt Form)
- PRD-003 (Receipt Canvas)

## Notes
- Test on real devices, not just browser DevTools
- Consider tablet layout (768px-1024px) as edge case
- Ensure canvas remains legible on small screens
- Consider adding a "Preview" button on mobile to jump to canvas
- Print layout considerations for future
