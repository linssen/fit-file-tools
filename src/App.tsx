import { useState, useCallback } from "react";
import FitFileParser, { type ParsedFitData } from "./fitParser";
import FileUpload from "./components/FileUpload";
import FileInfo from "./components/FileInfo";
import ActivitySummary from "./components/ActivitySummary";
import DataPreview from "./components/DataPreview";
import "./styles.css";

export default function App() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fitData, setFitData] = useState<ParsedFitData | null>(null);
    const [fileName, setFileName] = useState<string>("");

    const parser = new FitFileParser();

    const handleFileSelect = useCallback(async (file: File) => {
        try {
            setError(null);
            setLoading(true);
            setFileName(file.name);

            // Read file as ArrayBuffer
            const buffer = await new Promise<ArrayBuffer>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target?.result as ArrayBuffer);
                reader.onerror = reject;
                reader.readAsArrayBuffer(file);
            });

            // Parse FIT file
            const data = await parser.parse(buffer);
            setFitData(data);
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : String(err);
            setError(`Error processing file: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <div className="container">
            <header>
                <h1>FIT File Reader</h1>
                <p>Parse and analyze Garmin FIT files</p>
            </header>

            <FileUpload onFileSelect={handleFileSelect} loading={loading} />

            {error && (
                <div className="error" role="alert">
                    {error}
                </div>
            )}

            {loading && <div className="loading">Parsing file...</div>}

            {fitData && !loading && (
                <div id="resultsSection" className="results">
                    <FileInfo fileName={fileName} fitData={fitData} />
                    <ActivitySummary summary={fitData.summary} />
                    <DataPreview
                        gpsData={fitData.gpsData}
                        heartRateData={fitData.heartRateData}
                    />
                </div>
            )}
        </div>
    );
}
