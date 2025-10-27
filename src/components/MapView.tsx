/**
 * MapView component - displays GPS track on an interactive map
 * Uses Leaflet with OpenStreetMap tiles (both fully open source)
 */

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { GpsPoint } from "../fitParser";

interface MapViewProps {
    gpsData: GpsPoint[];
}

const MapView: React.FC<MapViewProps> = ({ gpsData }) => {
    const mapRef = useRef<L.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);

    // Filter out invalid GPS points early
    const validGpsData = gpsData.filter(
        (point) =>
            point.lat !== null &&
            point.lng !== null &&
            !isNaN(point.lat) &&
            !isNaN(point.lng)
    );

    useEffect(() => {
        if (!mapContainerRef.current || validGpsData.length === 0) {
            return;
        }

        // Initialize map if not already created
        if (!mapRef.current) {
            mapRef.current = L.map(mapContainerRef.current, {
                center: [0, 0],
                zoom: 13,
                zoomControl: true,
            });

            // Add OpenStreetMap tiles (open source!)
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19,
            }).addTo(mapRef.current);
        }

        const map = mapRef.current;

        // Clear existing layers (except tile layer)
        map.eachLayer((layer) => {
            if (layer instanceof L.Polyline || layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        // Convert GPS data to Leaflet LatLng array
        // FIT files store coordinates in semicircles (2^31 / 180 degrees)
        // Need to convert to degrees if values are in semicircles format
        const latLngs: L.LatLngExpression[] = validGpsData.map((point) => {
            let lat = point.lat;
            let lng = point.lng;

            // If coordinates are in semicircles (large numbers), convert to degrees
            // Valid lat/lng ranges: lat [-90, 90], lng [-180, 180]
            // Semicircle values are much larger (e.g., 500000000+)
            if (Math.abs(lat) > 180 || Math.abs(lng) > 180) {
                lat = lat * (180 / Math.pow(2, 31));
                lng = lng * (180 / Math.pow(2, 31));
            }

            return [lat, lng] as L.LatLngExpression;
        });

        if (latLngs.length === 0) {
            return;
        }

        // Draw the GPS track as a polyline
        const polyline = L.polyline(latLngs, {
            color: "#2563eb", // Blue color
            weight: 3,
            opacity: 0.8,
        }).addTo(map);

        // Add markers for start and end points
        const startIcon = L.divIcon({
            html: '<div style="background: #10b981; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>',
            className: "start-marker",
            iconSize: [16, 16],
            iconAnchor: [8, 8],
        });

        const endIcon = L.divIcon({
            html: '<div style="background: #ef4444; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>',
            className: "end-marker",
            iconSize: [16, 16],
            iconAnchor: [8, 8],
        });

        // Add start marker (green)
        L.marker(latLngs[0], { icon: startIcon }).addTo(map).bindPopup("Start");

        // Add end marker (red)
        if (latLngs.length > 1) {
            L.marker(latLngs[latLngs.length - 1], { icon: endIcon })
                .addTo(map)
                .bindPopup("End");
        }

        // Fit map bounds to show entire track
        map.fitBounds(polyline.getBounds(), {
            padding: [50, 50],
        });

        // Cleanup function
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [validGpsData]);

    // Don't render anything if there's no valid GPS data
    if (validGpsData.length === 0) {
        return null;
    }

    return (
        <div className="map-view">
            <h3>GPS Track Map</h3>
            <div
                ref={mapContainerRef}
                className="map-container"
                style={{ height: "400px", width: "100%", borderRadius: "8px" }}
            />
            <div className="map-legend">
                <span className="legend-item">
                    <span
                        className="legend-marker"
                        style={{ background: "#10b981" }}
                    ></span>
                    Start
                </span>
                <span className="legend-item">
                    <span
                        className="legend-marker"
                        style={{ background: "#ef4444" }}
                    ></span>
                    End
                </span>
                <span className="legend-item">
                    <span
                        className="legend-line"
                        style={{ background: "#2563eb" }}
                    ></span>
                    Track
                </span>
            </div>
        </div>
    );
};

export default MapView;
