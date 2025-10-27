import type { ActivitySummary as ActivitySummaryType } from "../fitParser";

interface ActivitySummaryProps {
    summary: ActivitySummaryType;
}

export default function ActivitySummary({ summary }: ActivitySummaryProps) {
    const metrics = [
        { label: "Distance", value: summary.totalDistance },
        { label: "Duration", value: summary.totalElapsedTime },
        { label: "Avg Speed", value: summary.avgSpeed },
        { label: "Max Speed", value: summary.maxSpeed },
        { label: "Calories", value: summary.totalCalories },
        {
            label: "Avg HR",
            value: summary.avgHeartRate ? `${summary.avgHeartRate} bpm` : null,
        },
        {
            label: "Max HR",
            value: summary.maxHeartRate ? `${summary.maxHeartRate} bpm` : null,
        },
    ].filter((m) => m.value);

    if (metrics.length === 0) return null;

    return (
        <div className="data-section">
            <h4>Activity Summary</h4>
            <div className="summary-grid">
                {metrics.map((metric) => (
                    <div key={metric.label} className="metric">
                        <span className="label">{metric.label}</span>
                        <span className="value">{metric.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
