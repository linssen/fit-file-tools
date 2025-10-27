import { render } from "@testing-library/react";
import MapView from "../../components/MapView";
import type { GpsPoint } from "../../fitParser";

// Mock Leaflet
jest.mock("leaflet", () => {
    const mockMap = {
        addTo: jest.fn().mockReturnThis(),
        remove: jest.fn(),
        fitBounds: jest.fn(),
        eachLayer: jest.fn(),
        removeLayer: jest.fn(),
    };

    const mockPolyline = {
        addTo: jest.fn().mockReturnThis(),
        getBounds: jest.fn().mockReturnValue({
            isValid: jest.fn().mockReturnValue(true),
        }),
    };

    const mockMarker = {
        addTo: jest.fn().mockReturnThis(),
        bindPopup: jest.fn().mockReturnThis(),
    };

    const mockTileLayer = {
        addTo: jest.fn().mockReturnThis(),
    };

    return {
        map: jest.fn(() => mockMap),
        tileLayer: jest.fn(() => mockTileLayer),
        polyline: jest.fn(() => mockPolyline),
        marker: jest.fn(() => mockMarker),
        divIcon: jest.fn(() => ({})),
    };
});

// Mock Leaflet CSS import
jest.mock("leaflet/dist/leaflet.css", () => ({}));

describe("MapView", () => {
    const mockGpsData: GpsPoint[] = [
        { lat: 52.0907, lng: 5.1214, elevation: 10, timestamp: new Date() },
        { lat: 52.0908, lng: 5.1215, elevation: 11, timestamp: new Date() },
        { lat: 52.0909, lng: 5.1216, elevation: 12, timestamp: new Date() },
    ];

    describe("Rendering with GPS data", () => {
        it("should render map view with GPS track", () => {
            const { container } = render(<MapView gpsData={mockGpsData} />);

            const mapView = container.querySelector(".map-view");
            expect(mapView).toBeInTheDocument();

            const heading = container.querySelector("h3");
            expect(heading).toHaveTextContent("GPS Track Map");
        });

        it("should render map container", () => {
            const { container } = render(<MapView gpsData={mockGpsData} />);

            const mapContainer = container.querySelector(".map-container");
            expect(mapContainer).toBeInTheDocument();
        });

        it("should render legend with start and end markers", () => {
            const { container } = render(<MapView gpsData={mockGpsData} />);

            const legend = container.querySelector(".map-legend");
            expect(legend).toBeInTheDocument();

            const legendItems = container.querySelectorAll(".legend-item");
            expect(legendItems).toHaveLength(3); // Start, End, Track

            expect(legendItems[0]).toHaveTextContent("Start");
            expect(legendItems[1]).toHaveTextContent("End");
            expect(legendItems[2]).toHaveTextContent("Track");
        });
    });

    describe("Rendering without GPS data", () => {
        it("should not render anything when gpsData is empty array", () => {
            const { container } = render(<MapView gpsData={[]} />);

            // Component should return null, so nothing should be rendered
            expect(container.firstChild).toBeNull();
        });

        it("should not render map view when no GPS data", () => {
            const { container } = render(<MapView gpsData={[]} />);

            const mapView = container.querySelector(".map-view");
            expect(mapView).not.toBeInTheDocument();
        });

        it("should not render map container when no GPS data", () => {
            const { container } = render(<MapView gpsData={[]} />);

            const mapContainer = container.querySelector(".map-container");
            expect(mapContainer).not.toBeInTheDocument();
        });

        it("should not render legend when no GPS data", () => {
            const { container } = render(<MapView gpsData={[]} />);

            const legend = container.querySelector(".map-legend");
            expect(legend).not.toBeInTheDocument();
        });

        it("should not throw error with empty array", () => {
            expect(() => {
                render(<MapView gpsData={[]} />);
            }).not.toThrow();
        });
    });

    describe("GPS data with null coordinates", () => {
        it("should filter out GPS points with null lat/lng gracefully", () => {
            // Create data where some points have 0 as placeholder for invalid coords
            const dataWithInvalid: GpsPoint[] = [
                { lat: 0, lng: 0, elevation: null, timestamp: null },
                {
                    lat: 52.0907,
                    lng: 5.1214,
                    elevation: 10,
                    timestamp: new Date(),
                },
                {
                    lat: 52.0908,
                    lng: 5.1215,
                    elevation: 11,
                    timestamp: new Date(),
                },
            ];

            const { container } = render(<MapView gpsData={dataWithInvalid} />);

            // Should still render the map with valid points
            const mapView = container.querySelector(".map-view");
            expect(mapView).toBeInTheDocument();
        });

        it("should not render if GPS array has only invalid coordinates", () => {
            // Use NaN to simulate invalid data that gets filtered out
            const allInvalidData: GpsPoint[] = [
                { lat: NaN, lng: NaN, elevation: null, timestamp: null },
            ];

            const { container } = render(<MapView gpsData={allInvalidData} />);

            // Should not render anything since there are no valid coordinates
            expect(container.firstChild).toBeNull();
        });
    });

    describe("Coordinate conversion", () => {
        it("should handle coordinates in semicircles format (large numbers)", () => {
            const semicircleData: GpsPoint[] = [
                {
                    lat: 621230000, // Semicircles format
                    lng: 61040000, // Semicircles format
                    elevation: 10,
                    timestamp: new Date(),
                },
                {
                    lat: 621240000,
                    lng: 61050000,
                    elevation: 11,
                    timestamp: new Date(),
                },
            ];

            // Should not throw error when converting large coordinate values
            expect(() => {
                render(<MapView gpsData={semicircleData} />);
            }).not.toThrow();

            const { container } = render(<MapView gpsData={semicircleData} />);
            const mapView = container.querySelector(".map-view");
            expect(mapView).toBeInTheDocument();
        });

        it("should handle coordinates already in degrees format", () => {
            const degreesData: GpsPoint[] = [
                {
                    lat: 52.0907,
                    lng: 5.1214,
                    elevation: 10,
                    timestamp: new Date(),
                },
                {
                    lat: 52.0908,
                    lng: 5.1215,
                    elevation: 11,
                    timestamp: new Date(),
                },
            ];

            expect(() => {
                render(<MapView gpsData={degreesData} />);
            }).not.toThrow();

            const { container } = render(<MapView gpsData={degreesData} />);
            const mapView = container.querySelector(".map-view");
            expect(mapView).toBeInTheDocument();
        });
    });

    describe("Single GPS point", () => {
        it("should render map with single GPS point", () => {
            const singlePoint: GpsPoint[] = [
                {
                    lat: 52.0907,
                    lng: 5.1214,
                    elevation: 10,
                    timestamp: new Date(),
                },
            ];

            const { container } = render(<MapView gpsData={singlePoint} />);

            const mapView = container.querySelector(".map-view");
            expect(mapView).toBeInTheDocument();
        });
    });
});
