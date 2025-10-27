# FIT File Reader

A standalone HTML/JavaScript web application for reading and parsing Garmin FIT files directly in the browser.

## Features

- 🏃 **Client-side Processing**: All FIT file parsing happens in your browser - no data leaves your device
- 📁 **Drag & Drop**: Simple file upload interface with drag-and-drop support
- 🔍 **File Analysis**: Parse FIT file headers and extract basic information
- 🧪 **Unit Testing**: Built-in test suite for reliable development
- 📱 **Responsive**: Works on desktop and mobile browsers

## Getting Started

### Prerequisites

- Node.js 14+ and Yarn package manager
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

5. Build for production
   ```bash
   yarn build
   ```

### GitHub Pages Deployment

This project is ready to deploy on GitHub Pages:

1. Push code to your GitHub repository
2. Go to repository Settings → Pages
3. Select "Deploy from a branch" and choose `main` branch
4. Your app will be available at `https://yourusername.github.io/repositoryname`

## Testing

Open `tests/index.html` in your browser to run the unit test suite. Tests cover:

- FIT file format validation
- Header parsing
- Error handling
- File size calculations

## Project Structure

```
fitfiles/
├── index.html          # Main application
├── styles.css          # Application styles
├── js/
│   ├── app.js          # Main application logic
│   └── fitParser.js    # FIT file parsing logic
├── tests/
│   └── index.html      # Test suite
└── README.md           # This file
```

## Current Status

🚧 **Early Development Phase**

- ✅ Basic file upload and validation
- ✅ FIT file header parsing
- ✅ Unit testing framework
- ⏳ Full FIT protocol implementation (in progress)
- ⏳ Data visualization
- ⏳ GPS track display
- ⏳ Heart rate/power analysis

## FIT File Format

FIT (Flexible and Interoperable Data Transfer) is a proprietary binary format developed by Garmin for storing fitness data. This application aims to provide a complete client-side parser for extracting:

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
