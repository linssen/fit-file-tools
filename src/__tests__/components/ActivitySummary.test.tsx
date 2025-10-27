/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import ActivitySummary from "../../components/ActivitySummary";

describe("ActivitySummary", () => {
    test("should render all metrics when provided", () => {
        const summary = {
            totalDistance: "10.5 km",
            totalElapsedTime: "1:30:00",
            avgSpeed: "25.3 km/h",
            maxSpeed: "45.2 km/h",
            totalCalories: 650,
            avgHeartRate: 155,
            maxHeartRate: 185,
        };

        render(<ActivitySummary summary={summary} />);

        expect(screen.getByText("Activity Summary")).toBeInTheDocument();
        expect(screen.getByText("10.5 km")).toBeInTheDocument();
        expect(screen.getByText("1:30:00")).toBeInTheDocument();
        expect(screen.getByText("25.3 km/h")).toBeInTheDocument();
        expect(screen.getByText("45.2 km/h")).toBeInTheDocument();
        expect(screen.getByText("650")).toBeInTheDocument();
        expect(screen.getByText("155 bpm")).toBeInTheDocument();
        expect(screen.getByText("185 bpm")).toBeInTheDocument();
    });

    test("should render without heart rate data", () => {
        const summary = {
            totalDistance: "10.5 km",
            totalElapsedTime: "1:30:00",
            avgSpeed: "25.3 km/h",
            maxSpeed: "45.2 km/h",
            totalCalories: 650,
            avgHeartRate: null,
            maxHeartRate: null,
        };

        render(<ActivitySummary summary={summary} />);

        expect(screen.getByText("Activity Summary")).toBeInTheDocument();
        expect(screen.getByText("10.5 km")).toBeInTheDocument();
        expect(screen.queryByText(/bpm/)).not.toBeInTheDocument();
    });

    test("should render with partial heart rate data", () => {
        const summary = {
            totalDistance: "10.5 km",
            totalElapsedTime: "1:30:00",
            avgSpeed: "25.3 km/h",
            maxSpeed: null,
            totalCalories: null,
            avgHeartRate: 155,
            maxHeartRate: null,
        };

        render(<ActivitySummary summary={summary} />);

        expect(screen.getByText("Activity Summary")).toBeInTheDocument();
        expect(screen.getByText("155 bpm")).toBeInTheDocument();
        expect(screen.queryByText("Max HR")).not.toBeInTheDocument();
    });

    test("should return null when no metrics available", () => {
        const summary = {
            totalDistance: null,
            totalElapsedTime: null,
            avgSpeed: null,
            maxSpeed: null,
            totalCalories: null,
            avgHeartRate: null,
            maxHeartRate: null,
        };

        const { container } = render(<ActivitySummary summary={summary} />);

        expect(container.firstChild).toBeNull();
    });
});
