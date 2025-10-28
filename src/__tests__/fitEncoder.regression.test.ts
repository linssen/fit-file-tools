/**
 * Regression tests for FitFileEncoder
 * Tests for bug fixes and edge cases
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import FitFileEncoder, { type FieldModifications } from "../fitEncoder";
import { Encoder } from "@garmin/fitsdk";

// Mock the @garmin/fitsdk module
jest.mock("@garmin/fitsdk", () => ({
    Encoder: jest.fn(),
    Profile: {
        MesgNum: {
            FILE_ID: 0,
            DEVICE_INFO: 23,
            SESSION: 18,
            LAP: 19,
            RECORD: 20,
            EVENT: 21,
            ACTIVITY: 34,
        },
    },
}));

const MockedEncoder = Encoder as jest.MockedClass<typeof Encoder>;

describe("FitFileEncoder - Regression Tests", () => {
    let encoder: FitFileEncoder;

    beforeEach(() => {
        encoder = new FitFileEncoder();
        jest.clearAllMocks();
    });

    describe("Bug: Failed to encode deviceInfoMesgs - Could not write Message", () => {
        it("should handle real-world deviceInfo message structure", () => {
            const mockEncoder = {
                onMesg: jest.fn(),
                close: jest.fn(() => new Uint8Array([1, 2, 3, 4])),
            };

            MockedEncoder.mockImplementation(() => mockEncoder as any);

            // Real-world message structure from actual FIT file
            const rawMessages = {
                fileIdMesgs: [
                    {
                        type: "activity",
                        manufacturer: "garmin",
                        product: 1234,
                        serialNumber: 123456789,
                        timeCreated: new Date("2023-01-01T10:00:00"),
                    },
                ],
                deviceInfoMesgs: [
                    {
                        timestamp: new Date("2023-01-01T10:00:00"),
                        deviceIndex: 0,
                        manufacturer: "garmin",
                        product: 1234,
                        serialNumber: 123456789,
                        softwareVersion: 5.2,
                        hardwareVersion: 1,
                        cumOperatingTime: 1000,
                        batteryVoltage: 4.1,
                        batteryStatus: 4,
                        sensorPosition: 0,
                        descriptor: "Primary Device",
                        antTransmissionType: 0,
                        antDeviceNumber: 12345,
                        antNetwork: 0,
                        sourceType: 5,
                        productName: "Edge 530",
                    },
                ],
                sessionMesgs: [
                    {
                        timestamp: new Date("2023-01-01T11:30:00"),
                        sport: "cycling",
                        subSport: "road",
                        totalElapsedTime: 5400,
                        totalTimerTime: 5400,
                        totalDistance: 10500,
                        totalCalories: 650,
                    },
                ],
            };

            const modifications: FieldModifications = {
                device: {
                    manufacturer: "wahoo",
                    product: 5678,
                },
            };

            // Should not throw error
            expect(() => {
                encoder.encodeWithModifications(rawMessages, modifications);
            }).not.toThrow();

            // Verify encoding was successful
            expect(mockEncoder.close).toHaveBeenCalled();
        });

        it("should handle deviceInfo messages with undefined optional fields", () => {
            const mockEncoder = {
                onMesg: jest.fn(),
                close: jest.fn(() => new Uint8Array([1, 2, 3])),
            };

            MockedEncoder.mockImplementation(() => mockEncoder as any);

            const rawMessages = {
                deviceInfoMesgs: [
                    {
                        timestamp: new Date("2023-01-01T10:00:00"),
                        deviceIndex: 0,
                        manufacturer: "garmin",
                        product: 1234,
                        // Optional fields may be undefined
                        serialNumber: undefined,
                        softwareVersion: undefined,
                        hardwareVersion: undefined,
                    },
                ],
            };

            const modifications: FieldModifications = {
                device: {
                    manufacturer: "wahoo",
                },
            };

            expect(() => {
                encoder.encodeWithModifications(rawMessages, modifications);
            }).not.toThrow();
        });

        it("should preserve Date objects when cloning messages", () => {
            const mockEncoder = {
                onMesg: jest.fn(),
                close: jest.fn(() => new Uint8Array([1, 2, 3])),
            };

            MockedEncoder.mockImplementation(() => mockEncoder as any);

            const timestamp = new Date("2023-01-01T10:00:00");
            const rawMessages = {
                deviceInfoMesgs: [
                    {
                        timestamp,
                        deviceIndex: 0,
                        manufacturer: "garmin",
                        product: 1234,
                    },
                ],
            };

            encoder.encodeWithModifications(rawMessages, {});

            // Verify onMesg was called with a message that has the Date object
            // onMesg(mesgNum, message) - message is the second parameter
            expect(mockEncoder.onMesg).toHaveBeenCalled();
            const calledMessage = mockEncoder.onMesg.mock.calls[0][1];
            expect(calledMessage.timestamp).toBeInstanceOf(Date);
            expect(calledMessage.timestamp).toEqual(timestamp);
        });

        it("should handle nested objects in messages", () => {
            const mockEncoder = {
                onMesg: jest.fn(),
                close: jest.fn(() => new Uint8Array([1, 2, 3])),
            };

            MockedEncoder.mockImplementation(() => mockEncoder as any);

            const rawMessages = {
                sessionMesgs: [
                    {
                        timestamp: new Date("2023-01-01T10:00:00"),
                        sport: "cycling",
                        // Some messages might have nested structures
                        avgHeartRate: 155,
                        maxHeartRate: 185,
                    },
                ],
            };

            expect(() => {
                encoder.encodeWithModifications(rawMessages, {});
            }).not.toThrow();
        });

        it("should handle messages with all data types", () => {
            const mockEncoder = {
                onMesg: jest.fn(),
                close: jest.fn(() => new Uint8Array([1, 2, 3])),
            };

            MockedEncoder.mockImplementation(() => mockEncoder as any);

            const rawMessages = {
                sessionMesgs: [
                    {
                        // String
                        sport: "cycling",
                        // Number
                        totalDistance: 10500,
                        // Date
                        timestamp: new Date("2023-01-01T10:00:00"),
                        // Boolean (as number in FIT)
                        firstLapIndex: 0,
                        // Null/undefined
                        avgCadence: null,
                        maxCadence: undefined,
                        // Array (might be present in some message types)
                        // Note: FIT messages typically don't have arrays, but testing
                    },
                ],
            };

            expect(() => {
                encoder.encodeWithModifications(rawMessages, {});
            }).not.toThrow();

            // Verify message structure is preserved
            // onMesg(mesgNum, message) - message is the second parameter
            expect(mockEncoder.onMesg).toHaveBeenCalled();
            const calledMessage = mockEncoder.onMesg.mock.calls[0][1];
            expect(calledMessage.sport).toBe("cycling");
            expect(calledMessage.totalDistance).toBe(10500);
            expect(calledMessage.timestamp).toBeInstanceOf(Date);
        });
    });

    describe("Bug: Message modification mutating original data", () => {
        it("should not mutate original message when applying modifications", () => {
            const mockEncoder = {
                onMesg: jest.fn(),
                close: jest.fn(() => new Uint8Array([1, 2, 3])),
            };

            MockedEncoder.mockImplementation(() => mockEncoder as any);

            const originalMessage = {
                manufacturer: "garmin",
                product: 1234,
                serialNumber: 123456,
            };

            const rawMessages = {
                deviceInfoMesgs: [originalMessage],
            };

            const modifications: FieldModifications = {
                device: {
                    manufacturer: "wahoo",
                    product: 5678,
                },
            };

            encoder.encodeWithModifications(rawMessages, modifications);

            // Original message should not be modified
            expect(originalMessage.manufacturer).toBe("garmin");
            expect(originalMessage.product).toBe(1234);
        });
    });
});
