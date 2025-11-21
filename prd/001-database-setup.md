# PRD-001: RxDB Database Setup and Schema

## Purpose
Configure RxDB for offline-first data persistence, defining schemas for receipt data and draft storage in IndexedDB.

## Requirements

### 1. RxDB Configuration
- Initialize RxDB with IndexedDB adapter
- Configure database for browser environment
- Set up database singleton for app-wide access
- Enable offline-first synchronization capabilities

### 2. Database Schema Design

#### Draft Schema
Store in-progress receipt data:
```typescript
{
  id: string,           // Always 'current_draft'
  tenantName: string,
  landlordName: string,
  landlordAddress: string,
  landlordPAN: string,
  rentAmount: number,
  rentalPeriodStart: Date,
  rentalPeriodEnd: Date,
  paymentDate: Date,
  propertyAddress: string,
  paymentMode: string,  // Cash | Cheque | Online Transfer | UPI
  updatedAt: Date
}
```

#### Receipts Collection Schema
Store completed receipts:
```typescript
{
  id: string,           // UUID
  receiptNumber: string, // Format: RR-YYYY-NNN
  tenantName: string,
  landlordName: string,
  landlordAddress: string,
  landlordPAN: string,
  rentAmount: number,
  rentalPeriodStart: Date,
  rentalPeriodEnd: Date,
  paymentDate: Date,
  propertyAddress: string,
  paymentMode: string,
  createdAt: Date,
  imageDataUrl: string  // Base64 PNG data (optional for future)
}
```

### 3. Database Composable
Create `src/composables/useDatabase.ts`:
- Export function to initialize database
- Provide methods for CRUD operations
- Handle database errors gracefully
- Ensure type safety with TypeScript interfaces

### 4. Type Definitions
Create `src/types/receipt.ts`:
- Define TypeScript interfaces for schemas
- Export PaymentMode enum
- Export ReceiptData interface
- Export DraftData interface

### 5. Auto-Increment Receipt Numbers
- Implement logic to generate receipt numbers: `RR-YYYY-NNN`
- NNN should be zero-padded sequential number per year
- Query receipts collection to determine next number

## Technical References
- **SPEC.md Section 3.1**: Auto-Generated Fields
- **SPEC.md Section 3.3**: Local Storage
- **SPEC.md Section 4**: Application Architecture
- **AGENTS.md Section 3**: RxDB requirement
- **AGENTS.md Section 4**: Offline-First principle

## Acceptance Criteria
- [ ] RxDB initializes successfully in browser
- [ ] Database persists data to IndexedDB
- [ ] Draft schema can store and retrieve form data
- [ ] Receipts collection can store completed receipts
- [ ] Receipt number generation works correctly
- [ ] All database operations are type-safe
- [ ] Database works offline after initial setup
- [ ] No console errors related to database

## Dependencies
- PRD-000 (Project Setup)

## Notes
- Database should be lazy-loaded (initialize on first use)
- Consider migration strategy for future schema changes
- Ensure proper error handling for quota exceeded scenarios
