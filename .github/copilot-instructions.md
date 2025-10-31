# Copilot Instructions for AI Coding Agents

## Project Overview

This is a standalone HTML/JavaScript web application for reading and parsing Garmin FIT files (a proprietary binary format used by Garmin devices for fitness data).

## Architecture & Goals

-   **Target:** Single-page web application that runs entirely in the browser
-   **Core Functionality:** Parse FIT files uploaded by users and display fitness data
-   **No Backend:** All processing happens client-side for privacy and simplicity
-   **File Format:** FIT files contain binary-encoded fitness data (GPS tracks, heart rate, power, etc.)

## Technical Stack

-   **Frontend:** Modern TypeScript with Vite bundling
-   **FIT Parsing:** `@garmin/fitsdk` - Official Garmin FIT SDK (supports both reading and writing)
-   **File Handling:** HTML5 File API for local file uploads
-   **Testing:** Jest with jsdom environment (uses Babel for test transpilation)
-   **Build System:** Vite with esbuild for fast builds and HMR
-   **Package Manager:** Yarn
-   **Type Safety:** Strict TypeScript configuration

## Key Considerations

-   **Binary Parsing:** Uses official `@garmin/fitsdk` library with Decoder for robust FIT protocol support
-   **File Modification:** Encoder class available for modifying and exporting FIT files
-   **File Size:** FIT files can be large (GPS tracks) - library handles streaming efficiently
-   **Browser Compatibility:** ES6+ with modern browser targets (Vite handles transpilation)
-   **Privacy:** All data stays local - no server uploads

## Development Patterns

-   **Class-based Architecture**: `FitFileApp` handles UI, `FitFileParser` wraps @garmin/fitsdk library
-   **Event-driven UI**: Drag-and-drop file upload with visual feedback
-   **Error Handling**: Try-catch blocks with user-friendly error messages
-   **ES6 Modules**: Import/export syntax with Vite bundling
-   **Library Integration**: Wraps `@garmin/fitsdk` for consistent API and error handling
-   **Code Quality**: ESLint for linting, Prettier for formatting
-   **Type Safety**: Strict TypeScript with comprehensive type annotations

## Development Workflow

-   **Development**: `yarn dev` - starts Vite dev server with instant HMR
-   **Testing**: `yarn test` - runs Jest test suite
-   **Building**: `yarn build` - creates production bundle in `dist/` (TypeScript check + Vite build)
-   **Preview**: `yarn preview` - previews production build locally
-   **Test Coverage**: `yarn test:coverage` - generates coverage reports
-   **Linting**: `yarn lint` - checks code with ESLint
-   **Auto-fix**: `yarn lint:fix` - automatically fixes linting issues
-   **Formatting**: `yarn format` - formats code with Prettier
-   **Format Check**: `yarn format:check` - checks code formatting

## Testing Workflow

-   Jest with jsdom environment for DOM testing
-   Mocked File API and Buffer for browser compatibility
-   Comprehensive tests for file validation, parsing, and UI interactions
-   Automatic test discovery in `src/__tests__/` directories

## GitHub Pages Ready

-   Production build outputs to `dist/` directory
-   Single HTML file with bundled JS and CSS
-   No server required - completely client-side
-   Ready for direct deployment to GitHub Pages

_Update this document as new patterns and architectural decisions emerge._
