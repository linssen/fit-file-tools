import FitParser from "fit-file-parser";

interface FitDataRaw {
    sessions?: unknown[];
    records?: unknown[];
    activities?: unknown[];
    devices?: unknown[];
}

export interface ActivitySummary {
    sport?: string;
    totalElapsedTime?: string | null;
    totalDistance?: string | null;
    avgSpeed?: string | null;
    maxSpeed?: string | null;
    totalCalories?: number | null;
    avgHeartRate?: number | null;
    maxHeartRate?: number | null;
    startTime?: string | null;
    message?: string;
}

export interface GpsPoint {
    lat: number;
    lng: number;
    elevation: number | null;
    timestamp: Date | null;
}

export interface HeartRateData {
    heartRate: number;
    timestamp: Date | null;
}

export interface DeviceInfo {
    manufacturer?: string;
    product?: string;
    serialNumber?: number | null;
    softwareVersion?: number | null;
    hardwareVersion?: number | null;
    message?: string;
}

export interface OrganizedData {
    summary: ActivitySummary;
    gpsData: GpsPoint[];
    heartRateData: HeartRateData[];
    deviceInfo: DeviceInfo;
    rawData: {
        sessions: number;
        records: number;
        activities: number;
        devices: number;
    };
}

export interface ParsedFitData extends OrganizedData {
    success: boolean;
    fileSize: number;
}

/**
 * FIT File Parser wrapper using fit-file-parser library
 * Handles parsing of Garmin FIT files
 */
class FitFileParser {
    private parser: FitParser;

    constructor() {
        this.parser = new FitParser();
    }

    /**
     * Parse FIT file buffer
     */
    async parse(buffer: ArrayBuffer): Promise<ParsedFitData> {
        try {
            // Convert ArrayBuffer to Buffer for the parser
            const fitBuffer = Buffer.from(buffer);

            // Parse the FIT file using callback-based API
            const fitData = await new Promise<FitDataRaw>((resolve, reject) => {
                this.parser.parse(
                    fitBuffer,
                    (error: Error | null, data: unknown) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(data as FitDataRaw);
                        }
                    }
                );
            });

            // Extract and organize the data
            const organized = this.organizeData(fitData);

            return {
                success: true,
                fileSize: buffer.byteLength,
                ...organized,
            };
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error ? error.message : String(error);
            throw new Error(`Failed to parse FIT file: ${errorMessage}`);
        }
    }

    /**
     * Organize parsed FIT data into structured format
     */
    organizeData(fitData: FitDataRaw): OrganizedData {
        const { sessions, records, activities, devices } = fitData;

        return {
            summary: this.extractSummary(sessions, activities),
            gpsData: this.extractGpsData(records),
            heartRateData: this.extractHeartRateData(records),
            deviceInfo: this.extractDeviceInfo(devices),
            rawData: {
                sessions: sessions?.length || 0,
                records: records?.length || 0,
                activities: activities?.length || 0,
                devices: devices?.length || 0,
            },
        };
    }

    /**
     * Extract activity summary information
     */
    extractSummary(
        sessions: unknown[] = [],
        activities: unknown[] = []
    ): ActivitySummary {
        const session = sessions[0] as
            | Record<string, string | number | undefined>
            | undefined;
        const activity = activities[0] as
            | Record<string, string | number | undefined>
            | undefined;

        if (!session && !activity) {
            return { message: "No session or activity data found" };
        }

        const summary: ActivitySummary = {};

        if (session) {
            summary.sport =
                typeof session.sport === "string" ? session.sport : "Unknown";
            summary.totalElapsedTime =
                typeof session.total_elapsed_time === "number"
                    ? this.formatDuration(session.total_elapsed_time)
                    : null;
            summary.totalDistance =
                typeof session.total_distance === "number"
                    ? `${(session.total_distance / 1000).toFixed(2)} km`
                    : null;
            summary.avgSpeed =
                typeof session.avg_speed === "number"
                    ? `${(session.avg_speed * 3.6).toFixed(1)} km/h`
                    : null;
            summary.maxSpeed =
                typeof session.max_speed === "number"
                    ? `${(session.max_speed * 3.6).toFixed(1)} km/h`
                    : null;
            summary.totalCalories =
                typeof session.total_calories === "number"
                    ? session.total_calories
                    : null;
            summary.avgHeartRate =
                typeof session.avg_heart_rate === "number"
                    ? session.avg_heart_rate
                    : null;
            summary.maxHeartRate =
                typeof session.max_heart_rate === "number"
                    ? session.max_heart_rate
                    : null;
            summary.startTime =
                typeof session.start_time === "string" ||
                typeof session.start_time === "number"
                    ? new Date(session.start_time).toLocaleString()
                    : null;
        }

        return summary;
    }

    /**
     * Extract GPS track data
     */
    extractGpsData(records: unknown[] = []): GpsPoint[] {
        return records
            .filter(
                (record): record is Record<string, unknown> =>
                    typeof record === "object" &&
                    record !== null &&
                    "position_lat" in record &&
                    "position_long" in record
            )
            .map((record) => ({
                lat: this.convertSemicirclesToDegrees(
                    record.position_lat as number
                ),
                lng: this.convertSemicirclesToDegrees(
                    record.position_long as number
                ),
                elevation:
                    typeof record.altitude === "number"
                        ? record.altitude
                        : null,
                timestamp:
                    record.timestamp instanceof Date ||
                    typeof record.timestamp === "string" ||
                    typeof record.timestamp === "number"
                        ? new Date(record.timestamp)
                        : null,
            }));
    }

    /**
     * Extract heart rate data
     */
    extractHeartRateData(records: unknown[] = []): HeartRateData[] {
        return records
            .filter(
                (record): record is Record<string, unknown> =>
                    typeof record === "object" &&
                    record !== null &&
                    "heart_rate" in record
            )
            .map((record) => ({
                heartRate: record.heart_rate as number,
                timestamp:
                    record.timestamp instanceof Date ||
                    typeof record.timestamp === "string" ||
                    typeof record.timestamp === "number"
                        ? new Date(record.timestamp)
                        : null,
            }));
    }

    /**
     * Extract device information
     */
    extractDeviceInfo(devices: unknown[] = []): DeviceInfo {
        const device = devices[0] as
            | Record<string, string | number | undefined>
            | undefined;
        if (!device) return { message: "No device information found" };

        return {
            manufacturer:
                typeof device.manufacturer === "string"
                    ? device.manufacturer
                    : "Unknown",
            product:
                typeof device.product === "string" ? device.product : "Unknown",
            serialNumber:
                typeof device.serial_number === "number"
                    ? device.serial_number
                    : null,
            softwareVersion:
                typeof device.software_version === "number"
                    ? device.software_version
                    : null,
            hardwareVersion:
                typeof device.hardware_version === "number"
                    ? device.hardware_version
                    : null,
        };
    }

    /**
     * Convert semicircles to degrees (Garmin GPS format)
     */
    convertSemicirclesToDegrees(semicircles: number): number {
        return semicircles * (180 / Math.pow(2, 31));
    }

    /**
     * Format duration from seconds to readable format
     */
    formatDuration(seconds: number): string {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
                .toString()
                .padStart(2, "0")}`;
        }
        return `${minutes}:${secs.toString().padStart(2, "0")}`;
    }
}

export default FitFileParser;
