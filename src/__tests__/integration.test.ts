/**
 * Integration tests with real FIT files
 */

// Skip integration tests for now - they require the real @garmin/fitsdk which has ES module issues in Jest
// These tests can be run manually or with a different test runner
describe.skip("FitFileParser Integration", () => {
    beforeEach(() => {
        // Parser will be initialized when we solve the ES module issue
    });

    test("should parse generated test FIT file", async () => {
        // TODO: Re-enable when ES module issues are resolved
        // Read the fixture file
        // const fixturePath = path.join(__dirname, "fixtures", "test-activity.fit");
        // const fileBuffer = fs.readFileSync(fixturePath);
        // const arrayBuffer = fileBuffer.buffer.slice(
        //     fileBuffer.byteOffset,
        //     fileBuffer.byteOffset + fileBuffer.byteLength
        // );
        // Parse the file
        // const result = await parser.parse(arrayBuffer);
        // Verify basic structure
        // expect(result.success).toBe(true);
        // expect(result.fileSize).toBeGreaterThan(0);
        // Verify we have data
        // expect(result.summary).toBeDefined();
        // expect(result.deviceInfo).toBeDefined();
        // expect(result.rawData).toBeDefined();
        // Check GPS data
        // if (result.gpsData.length > 0) {
        //     const firstPoint = result.gpsData[0];
        //     expect(typeof firstPoint.lat).toBe("number");
        //     expect(typeof firstPoint.lng).toBe("number");
        //     expect(firstPoint.lat).toBeGreaterThan(-90);
        //     expect(firstPoint.lat).toBeLessThan(90);
        //     expect(firstPoint.lng).toBeGreaterThan(-180);
        //     expect(firstPoint.lng).toBeLessThan(180);
        // }
        // Check heart rate data if available
        // if (result.heartRateData.length > 0) {
        //     const firstHR = result.heartRateData[0];
        //     expect(typeof firstHR.heartRate).toBe("number");
        //     expect(firstHR.heartRate).toBeGreaterThan(0);
        //     expect(firstHR.heartRate).toBeLessThan(300);
        // }
        // Verify parsed data makes sense for a cycling activity
        // expect(result.summary.sport).toBe("cycling");
        // expect(result.gpsData.length).toBe(13788);
        // expect(result.heartRateData.length).toBe(13788);
        // expect(result.rawData.records).toBe(13788);
        // expect(result.rawData.sessions).toBe(1);
    });

    test("should handle corrupt FIT file gracefully", async () => {
        // TODO: Re-enable when ES module issues are resolved
        // Create a corrupt buffer
        // const corruptBuffer = new ArrayBuffer(100);
        // const view = new Uint8Array(corruptBuffer);
        // view.fill(0xff); // Fill with invalid data
        // Should throw an error
        // await expect(parser.parse(corruptBuffer)).rejects.toThrow(
        //     /Failed to parse FIT file/
        // );
    });
});
