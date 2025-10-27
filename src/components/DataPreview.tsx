import type { GpsPoint, HeartRateData } from "../fitParser";

interface DataPreviewProps {
    gpsData: GpsPoint[];
    heartRateData: HeartRateData[];
}

export default function DataPreview({
    gpsData,
    heartRateData,
}: DataPreviewProps) {
    return (
        <>
            <div className="success">
                <h4>✓ FIT file parsed successfully!</h4>
                <p>
                    Extracted {gpsData.length} GPS points and{" "}
                    {heartRateData.length} heart rate readings.
                </p>
            </div>

            {gpsData.length > 0 && (
                <div className="data-section">
                    <h4>First GPS Points</h4>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Latitude</th>
                                    <th>Longitude</th>
                                    <th>Elevation</th>
                                    <th>Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gpsData.slice(0, 3).map((point, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{point.lat.toFixed(6)}</td>
                                        <td>{point.lng.toFixed(6)}</td>
                                        <td>
                                            {point.elevation !== null
                                                ? `${point.elevation} m`
                                                : "N/A"}
                                        </td>
                                        <td>
                                            {point.timestamp
                                                ? new Date(
                                                      point.timestamp
                                                  ).toLocaleTimeString()
                                                : "N/A"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {heartRateData.length > 0 && (
                <div className="data-section">
                    <h4>First Heart Rate Readings</h4>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Heart Rate</th>
                                    <th>Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {heartRateData
                                    .slice(0, 3)
                                    .map((point, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{point.heartRate} bpm</td>
                                            <td>
                                                {point.timestamp
                                                    ? new Date(
                                                          point.timestamp
                                                      ).toLocaleTimeString()
                                                    : "N/A"}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}
