/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import FileInfo from "../../components/FileInfo";

describe("FileInfo", () => {
    const mockFile = new File(["content"], "test.fit", {
        type: "application/octet-stream",
    });
    Object.defineProperty(mockFile, "size", { value: 1024 * 512 });

    const mockFitData = {
        success: true,
        fileSize: 1024 * 512,
        summary: {
            sport: "cycling",
            startTime: "2023-01-01 10:00:00",
            totalElapsedTime: "1:30:00",
            totalDistance: "10.5 km",
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
        gpsData: [],
        heartRateData: [],
    };

    test("should render file information", () => {
        render(<FileInfo fileName="test.fit" fitData={mockFitData} />);

        expect(screen.getByText("File Information")).toBeInTheDocument();
        expect(screen.getByText("test.fit")).toBeInTheDocument();
        expect(screen.getByText(/512/)).toBeInTheDocument();
        expect(screen.getByText("cycling")).toBeInTheDocument();
        expect(screen.getByText("2023-01-01 10:00:00")).toBeInTheDocument();
        expect(screen.getByText("1:30:00")).toBeInTheDocument();
        expect(screen.getByText("10.5 km")).toBeInTheDocument();
        expect(screen.getByText(/Garmin/)).toBeInTheDocument();
        expect(screen.getByText(/Edge 530/)).toBeInTheDocument();
        expect(screen.getByText("1500")).toBeInTheDocument();
    });

    test("should handle missing optional fields", () => {
        const minimalFitData = {
            success: true,
            fileSize: 1024,
            summary: {
                sport: "running",
            },
            deviceInfo: {},
            rawData: {
                records: 0,
                sessions: 0,
                activities: 0,
                devices: 0,
            },
            gpsData: [],
            heartRateData: [],
        };

        render(<FileInfo fileName="test.fit" fitData={minimalFitData} />);

        expect(screen.getByText("File Information")).toBeInTheDocument();
        expect(screen.getByText("running")).toBeInTheDocument();
    });
});
