import type { ParsedFitData } from "../fitParser";

interface FileInfoProps {
    fileName: string;
    fitData: ParsedFitData;
}

export default function FileInfo({ fileName, fitData }: FileInfoProps) {
    const { summary, rawData, deviceInfo, fileSize } = fitData;

    return (
        <div className="file-info">
            <h3>File Information</h3>
            <div className="info-grid">
                <p>
                    <strong>Filename:</strong> {fileName}
                </p>
                <p>
                    <strong>File Size:</strong> {Math.round(fileSize / 1024)} KB
                </p>
                <p>
                    <strong>Sport:</strong> {summary.sport || "Unknown"}
                </p>
                <p>
                    <strong>Start Time:</strong>{" "}
                    {summary.startTime || "Unknown"}
                </p>
                <p>
                    <strong>Duration:</strong>{" "}
                    {summary.totalElapsedTime || "Unknown"}
                </p>
                <p>
                    <strong>Distance:</strong>{" "}
                    {summary.totalDistance || "Unknown"}
                </p>
                <p>
                    <strong>Device:</strong>{" "}
                    {deviceInfo.manufacturer || "Unknown"}{" "}
                    {deviceInfo.product || ""}
                </p>
                <p>
                    <strong>Data Records:</strong> {rawData.records}
                </p>
            </div>
        </div>
    );
}
