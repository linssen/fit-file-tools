/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { Decoder, Stream } from "@garmin/fitsdk";

// Mock @garmin/fitsdk
jest.mock("@garmin/fitsdk");

describe("App", () => {
    let mockAlert: jest.SpyInstance;
    let mockStream: unknown;
    let mockDecoder: {
        read: jest.Mock;
    };

    beforeEach(() => {
        // Setup mocks
        mockStream = {};
        (Stream.fromArrayBuffer as jest.Mock) = jest
            .fn()
            .mockReturnValue(mockStream);
        (Decoder.isFIT as jest.Mock) = jest.fn().mockReturnValue(true);

        mockDecoder = {
            read: jest.fn().mockReturnValue({
                messages: {
                    sessionMesgs: [
                        {
                            sport: "cycling",
                            startTime: new Date("2023-01-01T10:00:00"),
                            totalElapsedTime: 5400, // 1:30:00
                            totalDistance: 10500, // 10.5 km
                            avgSpeed: 7.027777, // 25.3 km/h in m/s
                            maxSpeed: 12.555555, // 45.2 km/h in m/s
                            totalCalories: 650,
                            avgHeartRate: 155,
                            maxHeartRate: 185,
                        },
                    ],
                    recordMesgs: [
                        {
                            positionLat: 45.0,
                            positionLong: -122.0,
                            altitude: 100,
                            timestamp: new Date("2023-01-01T10:00:00"),
                            heartRate: 150,
                        },
                        {
                            positionLat: 45.1,
                            positionLong: -122.1,
                            altitude: 105,
                            timestamp: new Date("2023-01-01T10:01:00"),
                            heartRate: 155,
                        },
                    ],
                    activityMesgs: [],
                    deviceInfoMesgs: [
                        {
                            manufacturer: "Garmin",
                            product: "Edge 530",
                        },
                    ],
                },
                errors: [],
            }),
        };

        (Decoder as unknown as jest.Mock).mockImplementation(() => mockDecoder);

        mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
        mockAlert.mockRestore();
    });

    test("should render file upload component", () => {
        render(<App />);
        expect(
            screen.getByText(/Drop a \.FIT file here or click to browse/i)
        ).toBeInTheDocument();
    });

    test("should show error for invalid file extension", async () => {
        render(<App />);

        // Create a file with wrong extension
        const file = new File(["content"], "test.txt", { type: "text/plain" });
        const input = document.querySelector(
            'input[type="file"]'
        ) as HTMLInputElement;

        // Manually trigger the change event with the file
        // (bypassing accept attribute filtering in jsdom)
        Object.defineProperty(input, "files", {
            value: [file],
            writable: false,
        });

        const event = new Event("change", { bubbles: true });
        input.dispatchEvent(event);

        await waitFor(() => {
            expect(mockAlert).toHaveBeenCalledWith("Please select a .fit file");
        });
    });

    test("should show error for file too large", async () => {
        const user = userEvent.setup();
        render(<App />);

        // Create a 60MB file
        const largeBuffer = new ArrayBuffer(60 * 1024 * 1024);
        const file = new File([largeBuffer], "test.fit", {
            type: "application/octet-stream",
        });
        const input = document.querySelector(
            'input[type="file"]'
        ) as HTMLInputElement;

        await user.upload(input, file);

        await waitFor(() => {
            expect(mockAlert).toHaveBeenCalledWith(
                "File too large. Maximum size is 50MB"
            );
        });
    });

    test("should parse valid FIT file and display results", async () => {
        const user = userEvent.setup();
        render(<App />);

        const file = new File(["content"], "test.fit", {
            type: "application/octet-stream",
        });
        const input = document.querySelector(
            'input[type="file"]'
        ) as HTMLInputElement;

        await user.upload(input, file);

        // Wait for loading to finish and results to appear
        await waitFor(
            () => {
                expect(
                    screen.getByText("File Information")
                ).toBeInTheDocument();
            },
            { timeout: 3000 }
        );

        // Check file info is displayed
        expect(screen.getByText("test.fit")).toBeInTheDocument();
        expect(screen.getByText("cycling")).toBeInTheDocument();
        expect(screen.getByText("Garmin Edge 530")).toBeInTheDocument();

        // Check activity summary is displayed
        expect(screen.getByText("Activity Summary")).toBeInTheDocument();
        expect(screen.getAllByText("10.50 km")[0]).toBeInTheDocument();
        expect(screen.getByText("25.3 km/h")).toBeInTheDocument();

        // Check data preview is displayed
        expect(
            screen.getByText(/FIT file parsed successfully/i)
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                /Extracted 2 GPS points and 2 heart rate readings/i
            )
        ).toBeInTheDocument();
    });

    test("should show loading state while parsing", async () => {
        // Mock a slow read
        mockDecoder.read = jest.fn().mockImplementation(
            () =>
                new Promise((resolve) =>
                    setTimeout(
                        () =>
                            resolve({
                                messages: {
                                    sessionMesgs: [
                                        {
                                            sport: "cycling",
                                            startTime: new Date(
                                                "2023-01-01T10:00:00"
                                            ),
                                            totalElapsedTime: 5400,
                                            totalDistance: 10500,
                                            avgSpeed: 7.027777,
                                            maxSpeed: 12.555555,
                                            totalCalories: 650,
                                            avgHeartRate: 155,
                                            maxHeartRate: 185,
                                        },
                                    ],
                                    recordMesgs: [
                                        {
                                            positionLat: 45.0,
                                            positionLong: -122.0,
                                            altitude: 100,
                                            timestamp: new Date(
                                                "2023-01-01T10:00:00"
                                            ),
                                            heartRate: 150,
                                        },
                                        {
                                            positionLat: 45.1,
                                            positionLong: -122.1,
                                            altitude: 105,
                                            timestamp: new Date(
                                                "2023-01-01T10:01:00"
                                            ),
                                            heartRate: 155,
                                        },
                                    ],
                                    activityMesgs: [],
                                    deviceInfoMesgs: [
                                        {
                                            manufacturer: "Garmin",
                                            product: "Edge 530",
                                        },
                                    ],
                                },
                                errors: [],
                            }),
                        100
                    )
                )
        );

        const user = userEvent.setup();
        render(<App />);

        const file = new File(["content"], "test.fit", {
            type: "application/octet-stream",
        });
        const input = document.querySelector(
            'input[type="file"]'
        ) as HTMLInputElement;

        await user.upload(input, file);

        // Check loading state appears
        expect(screen.getByText(/parsing file/i)).toBeInTheDocument();

        // Wait for parsing to complete
        await waitFor(
            () => {
                expect(
                    screen.queryByText(/parsing file/i)
                ).not.toBeInTheDocument();
            },
            { timeout: 3000 }
        );
    });

    test("should handle parsing errors", async () => {
        // Mock isFIT to throw error
        (Decoder.isFIT as jest.Mock) = jest.fn().mockReturnValue(false);

        const user = userEvent.setup();
        render(<App />);

        const file = new File(["content"], "test.fit", {
            type: "application/octet-stream",
        });
        const input = document.querySelector(
            'input[type="file"]'
        ) as HTMLInputElement;

        await user.upload(input, file);

        await waitFor(() => {
            expect(
                screen.getByText(/error processing file/i)
            ).toBeInTheDocument();
        });
    });

    test("should allow uploading another file after successful parse", async () => {
        const user = userEvent.setup();
        render(<App />);

        const file = new File(["content"], "test.fit", {
            type: "application/octet-stream",
        });
        const input = document.querySelector(
            'input[type="file"]'
        ) as HTMLInputElement;

        await user.upload(input, file);

        await waitFor(
            () => {
                expect(
                    screen.getByText("File Information")
                ).toBeInTheDocument();
            },
            { timeout: 3000 }
        );

        // Should still be able to upload another file
        const input2 = document.querySelector(
            'input[type="file"]'
        ) as HTMLInputElement;
        expect(input2).toBeInTheDocument();
    });

    test("should handle drag and drop file upload", () => {
        render(<App />);

        const dropArea = document.querySelector(".upload-area");
        expect(dropArea).toBeInTheDocument();

        // Test that drag over event handler exists
        const dragOverEvent = new Event("dragover", { bubbles: true });
        const preventDefaultSpy = jest.fn();
        Object.defineProperty(dragOverEvent, "preventDefault", {
            value: preventDefaultSpy,
        });

        dropArea?.dispatchEvent(dragOverEvent);
        expect(preventDefaultSpy).toHaveBeenCalled();
    });

    test("should disable input while loading", async () => {
        const user = userEvent.setup();
        mockDecoder.read = jest.fn().mockImplementation(
            () =>
                new Promise((resolve) =>
                    setTimeout(
                        () =>
                            resolve({
                                messages: {
                                    sessionMesgs: [
                                        {
                                            sport: "cycling",
                                            startTime: new Date(
                                                "2023-01-01T10:00:00"
                                            ),
                                            totalElapsedTime: 5400,
                                            totalDistance: 10500,
                                            avgSpeed: 7.027777,
                                            maxSpeed: 12.555555,
                                            totalCalories: 650,
                                            avgHeartRate: 155,
                                            maxHeartRate: 185,
                                        },
                                    ],
                                    recordMesgs: [
                                        {
                                            positionLat: 45.0,
                                            positionLong: -122.0,
                                            altitude: 100,
                                            timestamp: new Date(
                                                "2023-01-01T10:00:00"
                                            ),
                                            heartRate: 150,
                                        },
                                        {
                                            positionLat: 45.1,
                                            positionLong: -122.1,
                                            altitude: 105,
                                            timestamp: new Date(
                                                "2023-01-01T10:01:00"
                                            ),
                                            heartRate: 155,
                                        },
                                    ],
                                    activityMesgs: [],
                                    deviceInfoMesgs: [
                                        {
                                            manufacturer: "Garmin",
                                            product: "Edge 530",
                                        },
                                    ],
                                },
                                errors: [],
                            }),
                        500
                    )
                )
        );

        render(<App />);

        const file = new File(["content"], "test.fit", {
            type: "application/octet-stream",
        });
        const input = document.querySelector(
            'input[type="file"]'
        ) as HTMLInputElement;

        await user.upload(input, file);

        // Check that input is disabled while loading
        await waitFor(() => {
            const disabledInput = document.querySelector(
                'input[type="file"][disabled]'
            );
            expect(disabledInput).toBeInTheDocument();
        });

        // Wait for loading to finish
        await waitFor(
            () => {
                expect(
                    screen.queryByText(/parsing file/i)
                ).not.toBeInTheDocument();
            },
            { timeout: 3000 }
        );
    });
});
