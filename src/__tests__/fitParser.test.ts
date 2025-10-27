import FitFileParser from "../fitParser";
import { Decoder, Stream } from "@garmin/fitsdk";

// Mock @garmin/fitsdk
jest.mock("@garmin/fitsdk");

describe("FitFileParser", () => {
    let parser: FitFileParser;
    let mockDecoder: jest.Mocked<Decoder>;
    let mockStream: jest.Mocked<Stream>;

    beforeEach(() => {
        parser = new FitFileParser();

        // Setup mocks
        mockStream = {} as jest.Mocked<Stream>;
        (Stream.fromArrayBuffer as jest.Mock) = jest
            .fn()
            .mockReturnValue(mockStream);
        (Decoder.isFIT as jest.Mock) = jest.fn().mockReturnValue(true);

        mockDecoder = {
            read: jest.fn().mockReturnValue({
                messages: {
                    sessionMesgs: [],
                    recordMesgs: [],
                    activityMesgs: [],
                    deviceInfoMesgs: [],
                },
                errors: [],
            }),
        } as unknown as jest.Mocked<Decoder>;

        (Decoder as unknown as jest.Mock).mockImplementation(() => mockDecoder);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should instantiate correctly", () => {
        expect(parser).toBeInstanceOf(FitFileParser);
    });

    test("should format duration correctly", () => {
        expect(parser.formatDuration(65)).toBe("1:05");
        expect(parser.formatDuration(3665)).toBe("1:01:05");
        expect(parser.formatDuration(30)).toBe("0:30");
    });

    test("should organize GPS data correctly", () => {
        const mockRecords = [
            {
                positionLat: 45.0,
                positionLong: -122.0,
                altitude: 100,
                timestamp: new Date("2023-01-01T10:00:00Z"),
            },
            {
                positionLat: 45.1,
                positionLong: -122.1,
                altitude: 105,
                timestamp: new Date("2023-01-01T10:01:00Z"),
            },
        ];

        const gpsData = parser.extractGpsData(mockRecords);

        expect(gpsData).toHaveLength(2);
        expect(gpsData[0]).toMatchObject({
            lat: 45.0,
            lng: -122.0,
            elevation: 100,
            timestamp: expect.any(Date),
        });
    });

    test("should extract heart rate data correctly", () => {
        const mockRecords = [
            {
                heartRate: 150,
                timestamp: new Date("2023-01-01T10:00:00Z"),
            },
            {
                heartRate: 155,
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
                serialNumber: 123456789,
                softwareVersion: 12.0,
                hardwareVersion: 1.0,
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
