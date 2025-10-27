# Copilot Instructions for AI Coding Agents

## Project Overview

This is a standalone HTML/JavaScript web application for reading and parsing Garmin FIT files (a proprietary binary format used by Garmin devices for fitness data).

## Architecture & Goals

-   **Target:** Single-page web application that runs entirely in the browser
-   **Core Functionality:** Parse FIT files uploaded by users and display fitness data
-   **No Backend:** All processing happens client-side for privacy and simplicity
-   **File Format:** FIT files contain binary-encoded fitness data (GPS tracks, heart rate, power, etc.)

## Technical Stack

-   **Frontend:** Modern TypeScript with Webpack bundling
-   **FIT Parsing:** `fit-file-parser` by jimmykane (browser-compatible)
-   **File Handling:** HTML5 File API for local file uploads
-   **Testing:** Jest with jsdom environment
-   **Build System:** Webpack with Babel transpilation (TypeScript support)
-   **Package Manager:** Yarn
-   **Type Safety:** Strict TypeScript configuration

## Key Considerations

-   **Binary Parsing:** Uses proven `fit-file-parser` library for robust FIT protocol support
-   **File Size:** FIT files can be large (GPS tracks) - library handles streaming efficiently
-   **Browser Compatibility:** ES6+ with Babel transpilation for broader support
-   **Privacy:** All data stays local - no server uploads

## Project Structure

```
fitfiles/
├── src/
│   ├── index.html          # HTML template for webpack
│   ├── index.ts            # Main entry point (TypeScript)
│   ├── styles.css          # Application styles
│   ├── app.ts              # Main application logic (FitFileApp class)
│   ├── fitParser.ts        # FIT file parsing wrapper (FitFileParser class)
│   ├── fit-file-parser.d.ts # Type declarations for fit-file-parser
│   └── __tests__/
│       ├── setup.ts        # Jest test setup and mocks
│       ├── app.test.ts     # FitFileApp tests
│       └── fitParser.test.ts # FitFileParser tests
├── dist/                   # Built files (auto-generated)
├── package.json            # Dependencies and scripts
├── webpack.config.js       # Webpack configuration
├── jest.config.js          # Jest test configuration
├── .babelrc.js            # Babel transpilation config
├── tsconfig.json          # TypeScript configuration
├── .gitignore             # Git ignore patterns
└── README.md              # Project documentation
```

## Development Patterns

-   **Class-based Architecture**: `FitFileApp` handles UI, `FitFileParser` wraps fit-file-parser library
-   **Event-driven UI**: Drag-and-drop file upload with visual feedback
-   **Error Handling**: Try-catch blocks with user-friendly error messages
-   **ES6 Modules**: Import/export syntax with Webpack bundling
-   **Library Integration**: Wraps `fit-file-parser` for consistent API and error handling

## Development Workflow

-   **Development**: `yarn dev` - starts webpack-dev-server with hot reload
-   **Testing**: `yarn test` - runs Jest test suite
-   **Building**: `yarn build` - creates production bundle in `dist/`
-   **Test Coverage**: `yarn test:coverage` - generates coverage reports

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
