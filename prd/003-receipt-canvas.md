# PRD-003: Receipt Preview Canvas Component

## Purpose
Create an HTML5 canvas component that renders a professional, A4-proportioned rent receipt in real-time as users fill out the form.

## Requirements

### 1. Canvas Component
Create `src/components/ReceiptCanvas.vue`:
- Use HTML5 `<canvas>` element
- Implement canvas drawing using Composition API
- Calculate A4 proportions (210mm × 297mm aspect ratio)
- Make canvas responsive while maintaining aspect ratio

### 2. Canvas Dimensions
- **Mobile (<768px)**: Full width, maintain A4 aspect ratio
- **Desktop (>768px)**: Scale to fit preview pane (60% of screen)
- Use DPI scaling for high-resolution displays
- Render at 2x or 3x resolution for export quality

### 3. Receipt Layout Design

#### Header Section
- Title: "RENT RECEIPT" (bold, centered)
- Receipt Number: Right-aligned below title
- Horizontal divider line

#### Content Section (Structured Layout)
Display the following fields with labels:
- **Received From**: [Tenant Name]
- **Amount**: ₹[Rent Amount] (formatted with commas)
- **Amount in Words**: [Auto-converted text]
- **For Rent of Property**: [Property Address]
- **Rental Period**: [Start Date] to [End Date]
- **Payment Mode**: [Payment Mode]
- **Payment Date**: [Payment Date]

#### Landlord Section
- **Landlord Name**: [Name]
- **Address**: [Landlord Address]
- **PAN Number**: [PAN]

#### Footer Section
- Signature line with "Landlord's Signature" label
- Date line
- Small print: Revenue stamp information (if rent > ₹5,000/month)

### 4. Canvas Rendering Logic
Create `src/composables/useReceiptCanvas.ts`:
- Function to draw text with specified font, size, position
- Function to draw lines (dividers)
- Function to format currency (₹ symbol, commas)
- Function to convert number to words (Indian numbering)
- Function to format dates (DD/MM/YYYY or DD-MMM-YYYY)
- Function to clear and redraw entire canvas
- Handle canvas high-DPI rendering

### 5. Real-Time Updates
- Watch Pinia store for form data changes
- Debounce canvas redraw (100ms) for performance
- Redraw canvas whenever any form field updates
- Show placeholder text for empty fields (e.g., "___________")

### 6. Styling and Typography
- Use professional, readable fonts (Arial, Helvetica, sans-serif)
- Appropriate font sizes for hierarchy
- Adequate spacing and padding
- Black text on white background
- Clean, minimal design
- Align text properly (left, center, right as needed)

### 7. Export Functionality
Create `src/composables/useCanvasExport.ts`:
- Function to export canvas as PNG blob
- Function to trigger download with filename: `Receipt-[Number]-[Date].png`
- Ensure high resolution (at least 1240px width for A4)
- Proper MIME type and file handling

## Technical References
- **SPEC.md Section 3.2**: Live Preview
- **SPEC.md Section 3.3**: PNG Download
- **SPEC.md Section 5**: Responsive Layout
- **AGENTS.md Section 3**: Composition API and composables

## Acceptance Criteria
- [ ] Canvas displays A4-proportioned receipt
- [ ] All form fields render correctly on canvas
- [ ] Canvas updates in real-time with form changes
- [ ] Currency formatting works (₹ symbol, commas)
- [ ] Amount in words conversion is accurate
- [ ] Date formatting is consistent and readable
- [ ] Canvas is crisp on high-DPI displays
- [ ] Receipt is professionally formatted
- [ ] Export generates high-quality PNG
- [ ] Download filename is descriptive and correct
- [ ] Canvas scales responsively on different screens

## Dependencies
- PRD-000 (Project Setup)
- PRD-001 (Database Setup)
- PRD-002 (Receipt Form)

## Notes
- Consider using OffscreenCanvas for performance
- Test number-to-words for edge cases (lakhs, crores)
- Ensure text doesn't overflow canvas boundaries
- Consider adding optional logo/branding area for future
- Test on various screen sizes and pixel densities
