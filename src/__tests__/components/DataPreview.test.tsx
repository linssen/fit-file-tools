/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import DataPreview from "../../components/DataPreview";

describe("DataPreview", () => {
    const mockGpsData = [
        {
            lat: 45.0,
            lng: -122.0,
            elevation: 100,
            timestamp: new Date("2023-01-01T10:00:00"),
        },
        {
            lat: 45.1,
            lng: -122.1,
            elevation: 105,
            timestamp: new Date("2023-01-01T10:01:00"),
        },
    ];

    const mockHeartRateData = [
        { heartRate: 150, timestamp: new Date("2023-01-01T10:00:00") },
        { heartRate: 155, timestamp: new Date("2023-01-01T10:01:00") },
    ];

    test("should render success message with GPS and HR data", () => {
        render(
            <DataPreview
                gpsData={mockGpsData}
                heartRateData={mockHeartRateData}
            />
        );

        expect(
            screen.getByText(/FIT file parsed successfully/i)
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                /Extracted 2 GPS points and 2 heart rate readings/i
            )
        ).toBeInTheDocument();
    });

    test("should render GPS data table", () => {
        render(
            <DataPreview
                gpsData={mockGpsData}
                heartRateData={mockHeartRateData}
            />
        );

        expect(screen.getByText("First GPS Points")).toBeInTheDocument();
        expect(screen.getByText("45.000000")).toBeInTheDocument();
        expect(screen.getByText("-122.000000")).toBeInTheDocument();
        expect(screen.getByText("100 m")).toBeInTheDocument();
    });

    test("should render heart rate data table", () => {
        render(
            <DataPreview
                gpsData={mockGpsData}
                heartRateData={mockHeartRateData}
            />
        );

        expect(
            screen.getByText("First Heart Rate Readings")
        ).toBeInTheDocument();
        expect(screen.getByText("150 bpm")).toBeInTheDocument();
        expect(screen.getByText("155 bpm")).toBeInTheDocument();
    });

    test("should handle GPS data without elevation", () => {
        const gpsDataNoElevation = [
            {
                lat: 45.0,
                lng: -122.0,
                elevation: null,
                timestamp: new Date("2023-01-01T10:00:00"),
            },
        ];

        render(
            <DataPreview
                gpsData={gpsDataNoElevation}
                heartRateData={mockHeartRateData}
            />
        );

        expect(screen.getByText("N/A")).toBeInTheDocument();
    });

    test("should handle GPS data without timestamp", () => {
        const gpsDataNoTimestamp = [
            {
                lat: 45.0,
                lng: -122.0,
                elevation: 100,
                timestamp: null,
            },
        ];

        render(
            <DataPreview
                gpsData={gpsDataNoTimestamp}
                heartRateData={mockHeartRateData}
            />
        );

        expect(screen.getAllByText("N/A").length).toBeGreaterThan(0);
    });

    test("should not render GPS section when no GPS data", () => {
        render(<DataPreview gpsData={[]} heartRateData={mockHeartRateData} />);

        expect(screen.queryByText("First GPS Points")).not.toBeInTheDocument();
    });

    test("should not render HR section when no HR data", () => {
        render(<DataPreview gpsData={mockGpsData} heartRateData={[]} />);

        expect(
            screen.queryByText("First Heart Rate Readings")
        ).not.toBeInTheDocument();
    });

    test("should limit GPS data to first 3 points", () => {
        const manyGpsPoints = [
            {
                lat: 45.0,
                lng: -122.0,
                elevation: 100,
                timestamp: new Date("2023-01-01T10:00:00"),
            },
            {
                lat: 45.1,
                lng: -122.1,
                elevation: 101,
                timestamp: new Date("2023-01-01T10:01:00"),
            },
            {
                lat: 45.2,
                lng: -122.2,
                elevation: 102,
                timestamp: new Date("2023-01-01T10:02:00"),
            },
            {
                lat: 45.3,
                lng: -122.3,
                elevation: 103,
                timestamp: new Date("2023-01-01T10:03:00"),
            },
        ];

        render(
            <DataPreview
                gpsData={manyGpsPoints}
                heartRateData={mockHeartRateData}
            />
        );

        const rows = screen
            .getByText("First GPS Points")
            .closest(".data-section")
            ?.querySelectorAll("tbody tr");
        expect(rows).toHaveLength(3);
    });
});
