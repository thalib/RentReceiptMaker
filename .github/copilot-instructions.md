# RentReceiptMaker: AI Coding Agent Instructions

## 1. Core Objective
Develop and maintain a simple, offline-first, privacy-focused Rent Receipt Generator. All requirements are in `SPEC.md`—always check this before implementing changes.

## 2. Architecture & Structure
- **SPA, Client-Side Only:** No backend. All logic, rendering, and data storage (RxDB) is in-browser.
- **Offline-First:** All features must work without internet after initial load.
- **Mobile-First:** Design for mobile screens first, then scale up responsively.
- **Directory Structure:** All code is in `src/`:
  - `assets/` (static)
  - `components/` (Vue components)
  - `composables/` (reusable logic)
  - `stores/` (Pinia)
  - `database/` (RxDB schemas)
  - `utils/` (helpers, constants, error handling)
  - `types/` (TypeScript types)

## 3. Technical Stack
- **Vue 3** (`<script setup>`, Composition API)
- **Pinia** (state management)
- **RxDB** (IndexedDB persistence)
- **Vite** (build tool)
- **TypeScript** (strict mode recommended)
- **Tailwind CSS** (utility-first styling)
- **VeeValidate** (form validation)
- **Vitest** (unit/integration tests)

## 4. Developer Workflow
- **Install:** `npm install`
- **Dev Server:** `npm run dev`
- **Build:** `npm run build`
- **Preview:** `npm run preview`
- **Test:** `npm run test` (Vitest)
- **Format:** `npm run format` (Prettier)
- **Lint:** `npm run lint` (ESLint)
- **E2E:** `npm run test:e2e` (Playwright)
  - For CI, use `npm run build` then `npm run test:e2e`

## 5. Code & UX Conventions
- **Component Design:** Small, single-responsibility components. Use composables for logic.
- **Validation:** All user input is validated client-side before saving or rendering.
- **Error Handling:** Use `src/utils/errors.ts` for user-friendly error messages.
- **Constants:** Use `src/utils/constants.ts` for payment modes, date/currency formats, etc.
- **Accessibility:** Use `aria-live` for status, clear instructions, and input helpers. See PRD-009.
- **No Analytics/Tracking:** Do not add any analytics or external API calls.

## 6. Testing
- **Unit tests:** All utilities, composables, components, and stores must be tested.
- **Integration tests:** Cover form-to-canvas, form-to-database, and receipt generation flows.
- **Accessibility tests:** Required for all major flows.
- **Mock utilities:** Use for RxDB and browser APIs.

## 7. Task & PRD Workflow
- Always verify changes against `SPEC.md` and run all tests before submitting.

## 8. References
- `AGENTS.md` (AI agent rules)
- `SPEC.md` (definitive requirements)
- `prd/` (task breakdown)
- `src/README.md` (dev setup)
