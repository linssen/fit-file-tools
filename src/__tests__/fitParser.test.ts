import FitFileParser from "../fitParser";

describe("FitFileParser", () => {
    let parser: FitFileParser;

    beforeEach(() => {
        parser = new FitFileParser();
    });

    test("should instantiate correctly", () => {
        expect(parser).toBeInstanceOf(FitFileParser);
    });

    test("should convert semicircles to degrees correctly", () => {
        const semicircles = 1073741824; // 90 degrees in semicircles
        const degrees = parser.convertSemicirclesToDegrees(semicircles);
        expect(degrees).toBeCloseTo(90, 5);
    });

    test("should format duration correctly", () => {
        expect(parser.formatDuration(65)).toBe("1:05");
        expect(parser.formatDuration(3665)).toBe("1:01:05");
        expect(parser.formatDuration(30)).toBe("0:30");
    });

    test("should organize GPS data correctly", () => {
        const mockRecords = [
            {
                position_lat: 536870912, // ~45 degrees
                position_long: 536870912, // ~45 degrees
                altitude: 100,
                timestamp: new Date("2023-01-01T10:00:00Z"),
            },
            {
                position_lat: 537919488, // ~45.1 degrees
                position_long: 537919488, // ~45.1 degrees
                altitude: 105,
                timestamp: new Date("2023-01-01T10:01:00Z"),
            },
        ];

        const gpsData = parser.extractGpsData(mockRecords);

        expect(gpsData).toHaveLength(2);
        expect(gpsData[0]).toMatchObject({
            lat: expect.any(Number),
            lng: expect.any(Number),
            elevation: 100,
            timestamp: expect.any(Date),
        });
    });

    test("should extract heart rate data correctly", () => {
        const mockRecords = [
            {
                heart_rate: 150,
                timestamp: new Date("2023-01-01T10:00:00Z"),
            },
            {
                heart_rate: 155,
                timestamp: new Date("2023-01-01T10:01:00Z"),
            },
            {
                // Record without heart rate - should be filtered out
                timestamp: new Date("2023-01-01T10:02:00Z"),
            },
        ];

        const hrData = parser.extractHeartRateData(mockRecords);

        expect(hrData).toHaveLength(2);
        expect(hrData[0]).toMatchObject({
            heartRate: 150,
            timestamp: expect.any(Date),
        });
    });

    test("should handle empty data gracefully", () => {
        const organized = parser.organizeData({});

        expect(organized.summary).toEqual({
            message: "No session or activity data found",
        });
        expect(organized.gpsData).toEqual([]);
        expect(organized.heartRateData).toEqual([]);
        expect(organized.deviceInfo).toEqual({
            message: "No device information found",
        });
    });

    test("should extract device info correctly", () => {
        const mockDevices = [
            {
                manufacturer: "Garmin",
                product: "Edge 530",
                serial_number: 123456789,
                software_version: 12.0,
                hardware_version: 1.0,
            },
        ];

        const deviceInfo = parser.extractDeviceInfo(mockDevices);

        expect(deviceInfo).toMatchObject({
            manufacturer: "Garmin",
            product: "Edge 530",
            serialNumber: 123456789,
            softwareVersion: 12.0,
            hardwareVersion: 1.0,
        });
    });
});
