# FIT File Reader

A standalone React web application for reading and parsing Garmin FIT files directly in the browser.

## Features

- 🏃 **Client-side Processing**: All FIT file parsing happens in your browser - no data leaves your device
- ⚛️ **React 19**: Modern component-based architecture with hooks
- 📁 **Drag & Drop**: Intuitive file upload interface with drag-and-drop support
- � **Data Visualization**: View GPS tracks, heart rate, power, and more
- �🔍 **File Analysis**: Parse and display comprehensive FIT file data
- 🧪 **90%+ Test Coverage**: Comprehensive test suite with React Testing Library
- 📱 **Responsive**: Works on desktop and mobile browsers
- 🎨 **Modern UI**: Clean, user-friendly interface

## Getting Started

### Prerequisites

- Node.js 22+ and Yarn package manager
- Git for version control

### Local Development

1. Clone this repository
   ```bash
   git clone <your-repo-url>
   cd fitfiles
   ```

2. Install dependencies
   ```bash
   yarn install
   ```

3. Start development server
   ```bash
   yarn dev
   ```
   The app will open at http://localhost:9000

4. Run tests
   ```bash
   yarn test
   ```

5. Run tests with coverage
   ```bash
   yarn test:coverage
   ```

6. Build for production
   ```bash
   yarn build
   ```

## Development Workflow

This project uses a Pull Request workflow with automated quality checks.

### Branch Strategy

-   **Main Branch (`main`)**: Production-ready code, protected branch
-   **Feature Branches**: All development happens in feature branches

### Making Changes

1. **Create a feature branch:**

    ```bash
    git checkout -b feature/your-feature-name
    ```

2. **Make your changes and test locally:**

    ```bash
    yarn lint          # Check code quality
    yarn format:check  # Check code formatting
    yarn test          # Run all tests
    yarn build         # Verify build works
    ```

3. **Commit your changes:**

    ```bash
    git add .
    git commit -m "Description of your changes"
    ```

4. **Push to GitHub:**

    ```bash
    git push origin feature/your-feature-name
    ```

5. **Create a Pull Request:**
    - Go to your repository on GitHub
    - Click "Compare & pull request"
    - Fill in the PR description
    - Wait for automated checks to pass:
        - ✅ Linting (ESLint)
        - ✅ Formatting (Prettier)
        - ✅ Tests (Jest with coverage)
        - ✅ Build verification
    - Request review if needed
    - Merge when all checks pass

### Pull Request Checks

Every PR automatically runs:

-   **Lint**: ESLint checks for code quality issues
-   **Format**: Prettier verifies consistent code formatting
-   **Test**: Jest runs full test suite with coverage reporting
-   **Build**: Webpack creates production bundle to ensure no build errors

### GitHub Pages Deployment

This project automatically deploys to GitHub Pages using GitHub Actions:

1. Push code to your GitHub repository's `main` branch (via merged PRs)
2. GitHub Actions will automatically build and deploy
3. Go to repository Settings → Pages
4. Ensure "GitHub Actions" is selected as the source
5. Your app will be available at `https://yourusername.github.io/repositoryname`

The deployment workflow runs on every push to `main` and includes:
- Linting checks
- Code formatting verification
- Test execution
- Production build
- Automatic deployment

**Important:** The `main` branch should be protected to require PR reviews and passing checks before merging.

## Testing

Run the comprehensive test suite:

```bash
yarn test              # Run all tests
yarn test:watch        # Watch mode
yarn test:coverage     # With coverage report
```

Test coverage includes:
- React component rendering and interactions
- File upload validation (extension, size)
- FIT file parsing
- GPS and heart rate data extraction
- Error handling
- Loading states

Current coverage: **90.74%** overall, **85.29%** components

## Project Structure

```
fitfiles/
├── src/
│   ├── index.tsx              # React entry point
│   ├── App.tsx                # Main application component
│   ├── fitParser.ts           # FIT file parsing logic
│   ├── components/
│   │   ├── FileUpload.tsx     # File upload UI
│   │   ├── FileInfo.tsx       # File metadata display
│   │   ├── ActivitySummary.tsx # Activity metrics
│   │   └── DataPreview.tsx    # GPS/HR data tables
│   ├── __tests__/
│   │   ├── App.test.tsx
│   │   ├── fitParser.test.ts
│   │   ├── integration.test.ts
│   │   └── components/        # Component tests
│   ├── styles.css             # Application styles
│   └── index.html             # HTML template
├── dist/                      # Production build output
├── .github/workflows/
│   └── deploy.yml            # GitHub Pages deployment
├── webpack.config.js         # Build configuration
├── jest.config.js           # Test configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Webpack 5** - Module bundling
- **Jest** - Testing framework
- **React Testing Library** - Component testing
- **@garmin/fitsdk** - Official Garmin FIT SDK (read/write support)
- **ESLint + Prettier** - Code quality

## FIT File Format

FIT (Flexible and Interoperable Data Transfer) is a proprietary binary format developed by Garmin for storing fitness data. This application extracts:

- GPS coordinates and elevation
- Heart rate data
- Power meter data
- Cadence and speed
- Activity metadata

## Contributing

1. Make changes to the code
2. Run tests by opening `tests/index.html`
3. Ensure all tests pass before submitting changes
4. Update this README if adding new features

## Browser Compatibility

- Modern browsers with File API support
- Chrome 13+, Firefox 3.6+, Safari 6+, Edge 12+
- No server required - runs entirely client-side

## License

MIT License - feel free to use and modify as needed.
