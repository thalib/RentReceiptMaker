# AI Agent Instructions for Rent Receipt Generator

This document provides guidelines for AI agents working on this repository. Adhering to these instructions is crucial for maintaining code quality and architectural integrity.

## 1. Core Objective

Your primary goal is to develop and maintain a simple, offline-first, and privacy-focused Rent Receipt Generator application.

## 2. Single Source of Truth

The official and definitive requirements for this application are documented in [`SPEC.md`](./SPEC.md). **You must always refer to this document before implementing any changes.** If a requested change conflicts with the specification, you must update the `SPEC.md` first.

## 3. Technical Stack

The following technologies are mandated for this project. Do not introduce new libraries or frameworks without updating the specification:

- **Framework**: Vue 3 using the Composition API with `<script setup>`. Use composable functions for modular, reusable logic and clean code organization.
- **State Management**: Pinia as the official state management library for Vue 3, providing scalable and type-safe global/local state handling.
- **Local Database**: RxDB for offline-first data persistence, leveraging its reactive API to synchronize and persist receipt data in IndexedDB.
- **Build Tool**: Vite for fast bundling, dev server, and build optimizations.
- **Language**: TypeScript with strict type checking is strongly recommended for maintainability and reliability. JavaScript may be used for MVP, but migrate to TypeScript as soon as possible.
- **CSS & Styling**: Tailwind CSS for utility-first, responsive styling and rapid UI development.
- **Routing**: Vue Router (optional) for client-side navigation if expanding beyond a single SPA view.
- **Form Handling & Validation**: VeeValidate or custom composables for lightweight, reactive form validation.
- **Testing**: Vitest or Jest with Vue Test Utils for unit and integration testing.


## 4. Architectural Principles

-   **Client-Side Only**: The application must be a true single-page application (SPA). There is **no backend**. All logic, rendering, and data storage happens exclusively in the browser.
-   **Offline-First**: All features must be fully functional without an internet connection after the initial load. Use RxDB for all data-related operations.
-   **Mobile-First Design**: All UI components and layouts must be designed and implemented for mobile screens first, then scaled up for larger screens using responsive design techniques. Refer to `SPEC.md` for breakpoints.

## 5. Codebase & Development Rules

-   **Directory Structure**: All source code **must** be placed inside the `src/` directory. Follow the conventional Vue 3 project structure outlined in `README.md`.
-   **State Management**: For a project of this scale, rely on Vue's built-in reactivity. Avoid adding external state management libraries like Vuex or Pinia unless the `SPEC.md` is updated to reflect this need.
-   **Component Design**: Create small, reusable components. A component should have a single responsibility.
-   **No Analytics or Tracking**: Do not add any analytics, user tracking, or external API calls that could compromise user privacy.
-   **Validation**: All user input should be validated on the client side to ensure data integrity before it is saved to RxDB or rendered on the canvas.

## 6. Verification

Before submitting any changes, you must:
1.  Verify that your changes align with the requirements in `SPEC.md`.
2.  Ensure the application builds and runs without errors (`npm run dev` and `npm run build`).
3.  If tests are present, ensure all existing tests pass and add new tests for your changes.
