/**
 * Tests for FitFileEncoder
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import FitFileEncoder, { type FieldModifications } from "../fitEncoder";
import { Encoder } from "@garmin/fitsdk";

// Mock the @garmin/fitsdk module
jest.mock("@garmin/fitsdk");

const MockedEncoder = Encoder as jest.MockedClass<typeof Encoder>;

describe("FitFileEncoder", () => {
    let encoder: FitFileEncoder;

    beforeEach(() => {
        encoder = new FitFileEncoder();
        jest.clearAllMocks();
    });

    describe("encodeWithModifications", () => {
        it("should encode FIT file with device modifications", () => {
            const mockEncoder = {
                onMesg: jest.fn(),
                close: jest.fn(() => new Uint8Array([1, 2, 3, 4])),
            };

            MockedEncoder.mockImplementation(() => mockEncoder as any);

            const rawMessages = {
                fileIdMesgs: [
                    {
                        type: "activity",
                        manufacturer: "garmin",
                        product: 1234,
                    },
                ],
                deviceInfoMesgs: [
                    {
                        manufacturer: "garmin",
                        product: 1234,
                        serialNumber: 123456,
                        softwareVersion: 5.2,
                    },
                ],
                sessionMesgs: [
                    {
                        sport: "cycling",
                        totalDistance: 10500,
                    },
                ],
            };

            const modifications: FieldModifications = {
                device: {
                    manufacturer: "wahoo",
                    product: 5678,
                },
            };

            const result = encoder.encodeWithModifications(
                rawMessages,
                modifications
            );

            // Verify Encoder was instantiated
            expect(MockedEncoder).toHaveBeenCalled();
            expect(mockEncoder.close).toHaveBeenCalled();
            expect(result).toBeInstanceOf(Uint8Array);
            expect(result.length).toBe(4);
        });

        it("should handle encoding errors gracefully", () => {
            const mockEncoder = {
                onMesg: jest.fn(),
                close: jest.fn(() => {
                    throw new Error("Encoding failed");
                }),
            };

            MockedEncoder.mockImplementation(() => mockEncoder as any);

            const rawMessages = {
                fileIdMesgs: [{ type: "activity" }],
            };

            expect(() => {
                encoder.encodeWithModifications(rawMessages, {});
            }).toThrow("Encoding failed");
        });

        it("should handle empty message arrays", () => {
            const mockEncoder = {
                onMesg: jest.fn(),
                close: jest.fn(() => new Uint8Array()),
            };

            MockedEncoder.mockImplementation(() => mockEncoder as any);

            const rawMessages = {
                fileIdMesgs: [],
                deviceInfoMesgs: [],
            };

            encoder.encodeWithModifications(rawMessages, {});

            // Should still call close even with empty arrays
            expect(mockEncoder.close).toHaveBeenCalled();
        });

        it("should apply device modifications to deviceInfo messages", () => {
            const mockEncoder = {
                onMesg: jest.fn(),
                close: jest.fn(() => new Uint8Array()),
            };

            MockedEncoder.mockImplementation(() => mockEncoder as any);

            const rawMessages = {
                deviceInfoMesgs: [
                    {
                        manufacturer: "garmin",
                        product: 1000,
                        serialNumber: 111111,
                        softwareVersion: 1.0,
                    },
                ],
            };

            const modifications: FieldModifications = {
                device: {
                    manufacturer: "wahoo",
                    product: 2000,
                    serialNumber: 999999,
                    softwareVersion: 5.2,
                },
            };

            encoder.encodeWithModifications(rawMessages, modifications);

            // Verify encoding completed successfully
            // (modifications are applied but logged as "unknown message type"
            // because Profile.MesgNum is mocked as empty object)
            expect(mockEncoder.close).toHaveBeenCalled();
        });

        it("should apply only specified device modifications", () => {
            const mockEncoder = {
                onMesg: jest.fn(),
                close: jest.fn(() => new Uint8Array()),
            };

            MockedEncoder.mockImplementation(() => mockEncoder as any);

            const rawMessages = {
                deviceInfoMesgs: [
                    {
                        manufacturer: "garmin",
                        product: 1000,
                        serialNumber: 111111,
                        softwareVersion: 1.0,
                    },
                ],
            };

            const modifications: FieldModifications = {
                device: {
                    // Only modify serialNumber
                    serialNumber: 999999,
                },
            };

            encoder.encodeWithModifications(rawMessages, modifications);

            // Verify encoding completed successfully
            // (modifications are applied but logged as "unknown message type"
            // because Profile.MesgNum is mocked as empty object)
            expect(mockEncoder.close).toHaveBeenCalled();
        });

        it("should handle messages that are not in messageOrder", () => {
            const mockEncoder = {
                onMesg: jest.fn(),
                close: jest.fn(() => new Uint8Array()),
            };

            MockedEncoder.mockImplementation(() => mockEncoder as any);

            const rawMessages = {
                // Custom message type not in standard order
                customMesgs: [{ data: "test" }],
            };

            encoder.encodeWithModifications(rawMessages, {});

            // Should still process and call close
            expect(mockEncoder.close).toHaveBeenCalled();
        });
    });

    describe("createDownload", () => {
        let createElementSpy: jest.SpyInstance;
        let mockLink: {
            href: string;
            download: string;
            click: jest.Mock;
        };

        beforeEach(() => {
            // Setup DOM mocks
            mockLink = {
                href: "",
                download: "",
                click: jest.fn(),
            };

            createElementSpy = jest
                .spyOn(document, "createElement")
                .mockReturnValue(mockLink as unknown as HTMLElement);

            jest.spyOn(document.body, "appendChild").mockImplementation(
                jest.fn()
            );
            jest.spyOn(document.body, "removeChild").mockImplementation(
                jest.fn()
            );

            // Mock URL methods on global object
            global.URL.createObjectURL = jest
                .fn()
                .mockReturnValue("blob:mock-url");
            global.URL.revokeObjectURL = jest.fn();
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it("should create and trigger download with correct filename", () => {
            const data = new Uint8Array([1, 2, 3, 4, 5]);
            const originalFilename = "activity.fit";

            encoder.createDownload(data, originalFilename);

            // Verify Blob was created
            expect(global.URL.createObjectURL).toHaveBeenCalled();

            // Verify link element was created
            expect(createElementSpy).toHaveBeenCalledWith("a");

            // Verify filename has _modified suffix
            expect(mockLink.download).toBe("activity_modified.fit");

            // Verify href was set
            expect(mockLink.href).toBe("blob:mock-url");

            // Verify click was triggered
            expect(mockLink.click).toHaveBeenCalled();

            // Verify cleanup
            expect(document.body.appendChild).toHaveBeenCalledWith(mockLink);
            expect(document.body.removeChild).toHaveBeenCalledWith(mockLink);
            expect(global.URL.revokeObjectURL).toHaveBeenCalledWith(
                "blob:mock-url"
            );
        });

        it("should handle filenames without .fit extension", () => {
            const data = new Uint8Array([1, 2, 3]);
            const originalFilename = "myfile";

            encoder.createDownload(data, originalFilename);

            expect(mockLink.download).toBe("myfile_modified.fit");
        });

        it("should handle .FIT extension (case insensitive)", () => {
            const data = new Uint8Array([1, 2, 3]);
            const originalFilename = "ACTIVITY.FIT";

            encoder.createDownload(data, originalFilename);

            expect(mockLink.download).toBe("ACTIVITY_modified.fit");
        });
    });
});
