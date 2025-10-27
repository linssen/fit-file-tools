/**
 * @jest-environment jsdom
 */

import FitFileApp from "../app";

// Mock the FitFileParser
jest.mock("../fitParser", () => {
    return jest.fn().mockImplementation(() => ({
        parse: jest.fn().mockResolvedValue({
            success: true,
            fileSize: 1024,
            summary: {
                sport: "cycling",
                totalDistance: "10.5 km",
                avgSpeed: "25.3 km/h",
            },
            gpsData: [
                { lat: 45.0, lng: -122.0, elevation: 100 },
                { lat: 45.1, lng: -122.1, elevation: 105 },
            ],
            heartRateData: [{ heartRate: 150, timestamp: new Date() }],
            deviceInfo: {
                manufacturer: "Garmin",
                product: "Edge 530",
            },
            rawData: {
                records: 100,
                sessions: 1,
                activities: 1,
                devices: 1,
            },
        }),
    }));
});

describe("FitFileApp", () => {
    let app: FitFileApp;

    beforeEach(() => {
        // Set up DOM
        document.body.innerHTML = `
            <div class="upload-area" id="uploadArea">
                <input type="file" id="fileInput" accept=".fit" hidden>
            </div>
            <section class="results-section" id="resultsSection" style="display: none;">
                <div class="file-info" id="fileInfo"></div>
                <div class="data-display" id="dataDisplay"></div>
            </section>
        `;

        app = new FitFileApp();
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    test("should instantiate correctly", () => {
        expect(app).toBeInstanceOf(FitFileApp);
    });

    test("should set up event listeners", () => {
        const uploadArea = document.getElementById("uploadArea");
        const fileInput = document.getElementById("fileInput");

        expect(uploadArea).toBeDefined();
        expect(fileInput).toBeDefined();
    });

    test("should validate file extension", async () => {
        const mockFile = new File([""], "test.txt", { type: "text/plain" });

        // Spy on showError method
        const showErrorSpy = jest.spyOn(
            app as unknown as { showError: (message: string) => void },
            "showError"
        );

        await (
            app as unknown as { handleFile: (file: File) => Promise<void> }
        ).handleFile(mockFile);

        expect(showErrorSpy).toHaveBeenCalledWith("Please select a .fit file");
    });

    test("should validate file size", async () => {
        const largeBuffer = new ArrayBuffer(60 * 1024 * 1024); // 60MB
        const mockFile = new File([largeBuffer], "test.fit", {
            type: "application/octet-stream",
        });

        const showErrorSpy = jest.spyOn(
            app as unknown as { showError: (message: string) => void },
            "showError"
        );

        await (
            app as unknown as { handleFile: (file: File) => Promise<void> }
        ).handleFile(mockFile);

        expect(showErrorSpy).toHaveBeenCalledWith(
            "File too large. Maximum size is 50MB"
        );
    });

    test("should generate file info HTML correctly", () => {
        const mockFile = new File([""], "test.fit", {
            type: "application/octet-stream",
        });
        const mockFitData = {
            fileSize: 1024,
            summary: {
                sport: "cycling",
                startTime: "2023-01-01 10:00:00",
                totalElapsedTime: "1:30:00",
                totalDistance: "25.5 km",
            },
            deviceInfo: {
                manufacturer: "Garmin",
                product: "Edge 530",
            },
            rawData: {
                records: 1500,
                sessions: 1,
                activities: 1,
                devices: 1,
            },
            success: true,
            gpsData: [],
            heartRateData: [],
        };

        const html = (
            app as unknown as {
                generateFileInfoHTML: (file: File, fitData: unknown) => string;
            }
        ).generateFileInfoHTML(mockFile, mockFitData);

        expect(html).toContain("test.fit");
        expect(html).toContain("cycling");
        expect(html).toContain("Garmin Edge 530");
        expect(html).toContain("1500");
    });

    test("should generate data display HTML correctly", () => {
        const mockFitData = {
            summary: {
                totalDistance: "25.5 km",
                avgSpeed: "22.1 km/h",
                totalCalories: 650,
            },
            gpsData: [
                { lat: 45.0, lng: -122.0 },
                { lat: 45.1, lng: -122.1 },
            ],
            heartRateData: [{ heartRate: 150 }],
            deviceInfo: {},
            rawData: { records: 0, sessions: 0, activities: 0, devices: 0 },
            success: true,
            fileSize: 1024,
        };

        const html = (
            app as unknown as {
                generateDataDisplayHTML: (fitData: unknown) => string;
            }
        ).generateDataDisplayHTML(mockFitData);

        expect(html).toContain("FIT file parsed successfully");
        expect(html).toContain("2 GPS points");
        expect(html).toContain("1 heart rate readings");
        expect(html).toContain("25.5 km");
        expect(html).toContain("22.1 km/h");
    });

    test("should handle file reading", async () => {
        const mockFile = new File(["test"], "test.fit", {
            type: "application/octet-stream",
        });

        const buffer = await (
            app as unknown as {
                readFileAsArrayBuffer: (file: File) => Promise<ArrayBuffer>;
            }
        ).readFileAsArrayBuffer(mockFile);

        expect(buffer).toBeInstanceOf(ArrayBuffer);
    });
});
