# Rent Receipt Generator

A simple, free, and open-source single-page application for generating rent receipts. The app is designed to be offline-first, mobile-friendly, and privacy-focused, with no data ever leaving your browser.

**Live Demo**: [Link to be added]

## Overview

This project is a client-side tool built with Vue 3 and RxDB. It provides a straightforward interface for tenants and landlords to create and download rent receipts instantly. All data is stored locally in the browser's IndexedDB, meaning the application is fast, works offline, and respects user privacy.

The project's full requirements are documented in [`SPEC.md`](./SPEC.md).

## Features

-   **Real-time Preview**: See the rent receipt update live as you type.
-   **Offline First**: Works entirely offline after the initial page load.
-   **Privacy Focused**: No data is ever sent to a server. Everything stays in your browser.
-   **PNG Export**: Download your generated receipt as a high-quality PNG image.
-   **Responsive Design**: A clean, mobile-first interface that scales to any screen size.
-   **Auto-Save**: Form progress is automatically saved as a draft, so you never lose your work.

## Technical Stack

-   **Frontend Framework**: [Vue 3](https://vuejs.org/)
-   **Local Database**: [RxDB](https://rxdb.info/)
-   **Build Tool**: [Vite](https://vitejs.dev/)

## Project Setup

This project uses Node.js and npm for dependency management.

### Prerequisites

-   Node.js (v18.x or higher)
-   npm (v9.x or higher)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/rent-receipt-generator.git
    cd rent-receipt-generator
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Development Server

To start the local development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if specified).

### Building for Production

To create a production-ready build of the application:

```bash
npm run build
```

The optimized static assets will be generated in the `dist/` directory.

## Project Structure

All source code for the application is located within the `src/` directory.

```
/
├── public/       # Static assets
├── src/          # Application source code
│   ├── assets/   # Styles, fonts, images
│   ├── components/ # Reusable Vue components
│   ├── views/      # Page-level components
│   ├── App.vue     # Root component
│   └── main.js   # Application entry point
├── .gitignore
├── index.html
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
