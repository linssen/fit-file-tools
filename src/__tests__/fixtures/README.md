# Test Fixtures

## test-activity.fit

This is a synthetically generated FIT activity file created using the official @garmin/fitsdk Encoder. It contains:

- **File Type**: Activity
- **Sport**: Cycling
- **Duration**: 90 minutes (5400 seconds)
- **Distance**: 10.5 km
- **GPS Points**: 10 sample records in a circular pattern
- **Heart Rate**: Synthetic data (140-160 bpm range)
- **Device**: Garmin (manufacturer: 1, product: 1234, serial: 123456789)
- **Location**: Generic coordinates around 52.37°N, 4.89°E (not a real route)

### Generation

The file was generated using `scripts/generateTestFit.js`. To regenerate:

```bash
node scripts/generateTestFit.js
```

This creates a clean test file with **no real personal information** or sensitive data.

### Purpose

This fixture is used for:
- Unit and integration tests
- Verifying FIT file parsing functionality
- Testing the decoder with a known-good FIT file structure
- Examples in documentation

### File Size

Approximately 466 bytes - a minimal valid FIT activity file.
