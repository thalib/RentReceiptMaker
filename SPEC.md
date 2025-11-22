# Rent Receipt Generator: Specification

## 1. Overview

This document outlines the functional and technical specifications for the Rent Receipt Generator, a single-page application (SPA) designed to provide a simple, free, and open-source tool for creating and downloading rent receipts.

The application will operate entirely on the client-side, requiring no backend or user accounts. All data will be persisted locally in the browser's IndexedDB, ensuring privacy and offline-first functionality.

## 2. Core Principles

- **Simplicity**: The user interface will be intuitive, clean, and focused on the core task of generating a receipt.
- **Mobile-First**: The design will prioritize an excellent experience on mobile devices and scale gracefully to desktop layouts.
- **Offline-First**: The app must be fully functional without an internet connection after the initial load.
- **Privacy**: No user data will be transmitted or stored on any server.

## 3. Key Features (Version 1.0)

### 3.1. Receipt Generation Form

A single form will capture all necessary information for the rent receipt.

- **Inputs Required**:
    - Tenant Name
    - Landlord Name
    - Landlord Address
    - Landlord PAN Number
    - Rent Amount (in ₹)
    - Rental Period
    - Payment Date
    - Property Address
    - Payment Mode (Cash, Cheque, Online Transfer, UPI)
- **Auto-Generated Field**:
    - Receipt Number (e.g., `RR-YYYY-NNN`)
- **User Experience**:
    - The form will feature a clean, single-column layout.
    - Input fields will provide clear labels, placeholders, and helper text where necessary (e.g., PAN and revenue stamp rules).
    - User input will be auto-saved locally as a draft, allowing users to resume an in-progress receipt.

### 3.2. Live Preview

A real-time preview of the rent receipt will be displayed on an HTML5 canvas as the user fills out the form.

- **Layout**: The preview will be a professionally formatted, A4-proportioned receipt.
- **Content**: It will dynamically display all the data entered in the form.
- **Real-time Updates**: The canvas will update instantly with each change in the form.

### 3.3. Actions & Data Storage

- **Download**: Users can download the generated receipt as a high-quality PNG image.
- **Local Storage**: All form data and generated receipts will be stored locally using browser localStorage.
    - A `current_draft` entry will persist the form's state for auto-save functionality.
    - A `receipts` collection will store saved receipts for future access (History feature is post-MVP).

## 4. Application Architecture

- **Framework**: Vue 3
- **State Management**: Pinia for global state management with localStorage integration.
- **Local Storage**: Browser localStorage for simple, synchronous data persistence.
- **Structure**: All source code will reside within the `src/` directory.

## 5. Layout & Responsiveness

- **Mobile ( < 768px)**: A single-column, vertical layout. The form appears first, followed by the receipt preview below it.
- **Desktop ( > 768px)**: A split-screen layout. The form will occupy the left side (approx. 40%) and the live preview the right side (approx. 60%).

## 6. Future Enhancements (Post-MVP)

The following features are planned for future releases and should be considered during initial architecture design:

- PDF Export
- Bulk receipt generation (e.g., for 12 months)
- A "My Receipts" history section with search and filter capabilities.
- Landlord profile storage for reusing details.
- Template customization options.
