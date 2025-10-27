import { useState, useCallback } from "react";
import FitFileParser, { type ParsedFitData } from "./fitParser";
import FitFileEncoder, {
    type DeviceModifications,
    type FieldModifications,
} from "./fitEncoder";
import FileUpload from "./components/FileUpload";
import FileInfo from "./components/FileInfo";
import ActivitySummary from "./components/ActivitySummary";
import DataPreview from "./components/DataPreview";
import MapView from "./components/MapView";
import FieldEditor from "./components/FieldEditor";
import "./styles.css";

export default function App() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fitData, setFitData] = useState<ParsedFitData | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [isEditing, setIsEditing] = useState(false);

    const parser = new FitFileParser();
    const encoder = new FitFileEncoder();

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

    const handleModifyDevice = useCallback(
        (modifications: DeviceModifications) => {
            if (!fitData || !fitData.rawMessages) {
                setError("No FIT data available to modify");
                return;
            }

            try {
                // Create field modifications
                const fieldMods: FieldModifications = {
                    device: modifications,
                };

                // Encode with modifications
                const modifiedData = encoder.encodeWithModifications(
                    fitData.rawMessages,
                    fieldMods
                );

                // Trigger download
                encoder.createDownload(modifiedData, fileName);

                // Close the editor
                setIsEditing(false);
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : String(err);
                setError(`Error modifying file: ${errorMessage}`);
            }
        },
        [fitData, fileName]
    );

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

            {fitData && !loading && !isEditing && (
                <div id="resultsSection" className="results">
                    <FileInfo fileName={fileName} fitData={fitData} />
                    <ActivitySummary summary={fitData.summary} />
                    <MapView gpsData={fitData.gpsData} />
                    <DataPreview
                        gpsData={fitData.gpsData}
                        heartRateData={fitData.heartRateData}
                    />
                    <div className="actions">
                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="button-primary"
                        >
                            Modify Device Info & Download
                        </button>
                    </div>
                </div>
            )}

            {fitData && !loading && isEditing && (
                <div className="editor-section">
                    <FieldEditor
                        currentDevice={{
                            manufacturer: fitData.deviceInfo.manufacturer,
                            product: fitData.deviceInfo.product,
                            serialNumber: fitData.deviceInfo.serialNumber,
                            softwareVersion: fitData.deviceInfo.softwareVersion,
                        }}
                        onModify={handleModifyDevice}
                        onCancel={() => setIsEditing(false)}
                    />
                </div>
            )}
        </div>
    );
}
