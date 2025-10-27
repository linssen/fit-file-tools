import FitFileParser from "./fitParser";

interface ParsedFitData {
    success: boolean;
    fileSize: number;
    summary: any;
    gpsData: any[];
    heartRateData: any[];
    deviceInfo: any;
    rawData: {
        sessions: number;
        records: number;
        activities: number;
        devices: number;
    };
}

/**
 * Main application logic
 */
class FitFileApp {
    private fitParser: FitFileParser;

    constructor() {
        this.fitParser = new FitFileParser();
        this.initializeEventListeners();
    }

    private initializeEventListeners(): void {
        const uploadArea = document.getElementById("uploadArea");
        const fileInput = document.getElementById(
            "fileInput"
        ) as HTMLInputElement;

        if (!uploadArea || !fileInput) {
            console.error("Required DOM elements not found");
            return;
        }

        // Click to upload
        uploadArea.addEventListener("click", () => {
            fileInput.click();
        });

        // File input change
        fileInput.addEventListener("change", (e) => {
            const target = e.target as HTMLInputElement;
            if (target.files && target.files.length > 0) {
                this.handleFile(target.files[0]);
            }
        });

        // Drag and drop
        uploadArea.addEventListener("dragover", (e) => {
            e.preventDefault();
            uploadArea.classList.add("dragover");
        });

        uploadArea.addEventListener("dragleave", (e) => {
            e.preventDefault();
            uploadArea.classList.remove("dragover");
        });

        uploadArea.addEventListener("drop", (e) => {
            e.preventDefault();
            uploadArea.classList.remove("dragover");

            if (e.dataTransfer && e.dataTransfer.files.length > 0) {
                this.handleFile(e.dataTransfer.files[0]);
            }
        });
    }

    private async handleFile(file: File): Promise<void> {
        try {
            // Validate file
            if (!file.name.toLowerCase().endsWith(".fit")) {
                this.showError("Please select a .fit file");
                return;
            }

            if (file.size > 50 * 1024 * 1024) {
                // 50MB limit
                this.showError("File too large. Maximum size is 50MB");
                return;
            }

            // Show loading state
            this.showLoading();

            // Read file as ArrayBuffer
            const buffer = await this.readFileAsArrayBuffer(file);

            // Parse FIT file
            const fitData = await this.fitParser.parse(buffer);

            // Display results
            this.displayResults(file, fitData);
        } catch (error: any) {
            this.showError(`Error processing file: ${error.message}`);
        }
    }

    private readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    resolve(e.target.result as ArrayBuffer);
                } else {
                    reject(new Error("Failed to read file"));
                }
            };
            reader.onerror = () => reject(new Error("Failed to read file"));
            reader.readAsArrayBuffer(file);
        });
    }

    private displayResults(file: File, fitData: ParsedFitData): void {
        const resultsSection = document.getElementById("resultsSection");
        const fileInfo = document.getElementById("fileInfo");
        const dataDisplay = document.getElementById("dataDisplay");

        if (!resultsSection || !fileInfo || !dataDisplay) {
            console.error("Results display elements not found");
            return;
        }

        // Show results section
        resultsSection.style.display = "block";

        // Display file information
        fileInfo.innerHTML = this.generateFileInfoHTML(file, fitData);

        // Display parsed data
        dataDisplay.innerHTML = this.generateDataDisplayHTML(fitData);

        // Scroll to results
        resultsSection.scrollIntoView({ behavior: "smooth" });
    }

    private generateFileInfoHTML(
        file: File,
        fitData: ParsedFitData
    ): string {
        const { summary, rawData, deviceInfo } = fitData;

        return `
            <h3>File Information</h3>
            <div class="info-grid">
                <p><strong>Filename:</strong> ${file.name}</p>
                <p><strong>File Size:</strong> ${Math.round(
                    fitData.fileSize / 1024
                )} KB</p>
                <p><strong>Sport:</strong> ${summary.sport || "Unknown"}</p>
                <p><strong>Start Time:</strong> ${
                    summary.startTime || "Unknown"
                }</p>
                <p><strong>Duration:</strong> ${
                    summary.totalElapsedTime || "Unknown"
                }</p>
                <p><strong>Distance:</strong> ${
                    summary.totalDistance || "Unknown"
                }</p>
                <p><strong>Device:</strong> ${deviceInfo.manufacturer || "Unknown"} ${
            deviceInfo.product || ""
        }</p>
                <p><strong>Data Records:</strong> ${rawData.records}</p>
            </div>
        `;
    }

    private generateDataDisplayHTML(fitData: ParsedFitData): string {
        const { summary, gpsData, heartRateData, deviceInfo } = fitData;

        let html = `<div class="success">
            <h4>✓ FIT file parsed successfully!</h4>
            <p>Extracted ${gpsData.length} GPS points and ${heartRateData.length} heart rate readings.</p>
        </div>`;

        // Activity Summary
        if (Object.keys(summary).length > 1) {
            html += `
                <div class="data-section">
                    <h4>Activity Summary</h4>
                    <div class="summary-grid">
                        ${
                            summary.totalDistance
                                ? `<div class="metric"><span class="label">Distance</span><span class="value">${summary.totalDistance}</span></div>`
                                : ""
                        }
                        ${
                            summary.totalElapsedTime
                                ? `<div class="metric"><span class="label">Duration</span><span class="value">${summary.totalElapsedTime}</span></div>`
                                : ""
                        }
                        ${
                            summary.avgSpeed
                                ? `<div class="metric"><span class="label">Avg Speed</span><span class="value">${summary.avgSpeed}</span></div>`
                                : ""
                        }
                        ${
                            summary.maxSpeed
                                ? `<div class="metric"><span class="label">Max Speed</span><span class="value">${summary.maxSpeed}</span></div>`
                                : ""
                        }
                        ${
                            summary.totalCalories
                                ? `<div class="metric"><span class="label">Calories</span><span class="value">${summary.totalCalories}</span></div>`
                                : ""
                        }
                        ${
                            summary.avgHeartRate
                                ? `<div class="metric"><span class="label">Avg HR</span><span class="value">${summary.avgHeartRate} bpm</span></div>`
                                : ""
                        }
                        ${
                            summary.maxHeartRate
                                ? `<div class="metric"><span class="label">Max HR</span><span class="value">${summary.maxHeartRate} bpm</span></div>`
                                : ""
                        }
                    </div>
                </div>
            `;
        }

        // GPS Data Preview
        if (gpsData.length > 0) {
            const firstPoint = gpsData[0];
            const lastPoint = gpsData[gpsData.length - 1];
            html += `
                <div class="data-section">
                    <h4>GPS Track Data (${gpsData.length} points)</h4>
                    <p><strong>Start:</strong> ${firstPoint.lat.toFixed(
                        6
                    )}, ${firstPoint.lng.toFixed(6)}</p>
                    <p><strong>End:</strong> ${lastPoint.lat.toFixed(
                        6
                    )}, ${lastPoint.lng.toFixed(6)}</p>
                </div>
            `;
        }

        // Next Steps
        html += `
            <div class="next-steps">
                <h4>Available Data</h4>
                <ul>
                    ${
                        gpsData.length > 0
                            ? "<li>✓ GPS coordinates and elevation data</li>"
                            : "<li>✗ No GPS data found</li>"
                    }
                    ${
                        heartRateData.length > 0
                            ? "<li>✓ Heart rate measurements</li>"
                            : "<li>✗ No heart rate data found</li>"
                    }
                    <li>Ready for map visualization and data analysis</li>
                </ul>
            </div>
        `;

        return html;
    }

    private showError(message: string): void {
        const resultsSection = document.getElementById("resultsSection");
        const dataDisplay = document.getElementById("dataDisplay");

        if (!resultsSection || !dataDisplay) return;

        resultsSection.style.display = "block";
        dataDisplay.innerHTML = `
            <div class="error">
                <strong>Error:</strong> ${message}
            </div>
        `;
    }

    private showLoading(): void {
        const resultsSection = document.getElementById("resultsSection");
        const dataDisplay = document.getElementById("dataDisplay");

        if (!resultsSection || !dataDisplay) return;

        resultsSection.style.display = "block";
        dataDisplay.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <p>Processing FIT file...</p>
                <div class="loading-spinner"></div>
            </div>
        `;
    }
}

export default FitFileApp;
