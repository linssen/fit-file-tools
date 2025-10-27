import { Decoder, Stream } from "@garmin/fitsdk";

interface FitMessage {
    [key: string]: unknown;
}

interface FitMessages {
    sessionMesgs?: FitMessage[];
    recordMesgs?: FitMessage[];
    activityMesgs?: FitMessage[];
    deviceInfoMesgs?: FitMessage[];
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
 * FIT File Parser wrapper using @garmin/fitsdk
 * Handles parsing of Garmin FIT files
 */
class FitFileParser {
    /**
     * Parse FIT file buffer
     */
    async parse(buffer: ArrayBuffer): Promise<ParsedFitData> {
        try {
            // Create stream from ArrayBuffer
            const stream = Stream.fromArrayBuffer(buffer);

            // Check if it's a valid FIT file
            if (!Decoder.isFIT(stream)) {
                throw new Error("Invalid FIT file format");
            }

            // Create decoder and parse
            const decoder = new Decoder(stream);

            // Read all messages with options
            const { messages, errors } = decoder.read({
                applyScaleAndOffset: true,
                expandSubFields: true,
                expandComponents: true,
                convertTypesToStrings: true,
                convertDateTimesToDates: true,
                includeUnknownData: false,
                mergeHeartRates: false,
            });

            // Check for errors
            if (errors.length > 0) {
                console.warn("FIT parsing warnings:", errors);
            }

            // Extract and organize the data
            const organized = this.organizeData(messages);

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
    organizeData(messages: FitMessages): OrganizedData {
        const sessions = messages.sessionMesgs || [];
        const records = messages.recordMesgs || [];
        const activities = messages.activityMesgs || [];
        const devices = messages.deviceInfoMesgs || [];

        return {
            summary: this.extractSummary(sessions, activities),
            gpsData: this.extractGpsData(records),
            heartRateData: this.extractHeartRateData(records),
            deviceInfo: this.extractDeviceInfo(devices),
            rawData: {
                sessions: sessions.length,
                records: records.length,
                activities: activities.length,
                devices: devices.length,
            },
        };
    }

    /**
     * Extract activity summary information
     */
    extractSummary(
        sessions: FitMessage[] = [],
        activities: FitMessage[] = []
    ): ActivitySummary {
        const session = sessions[0];
        const activity = activities[0];

        if (!session && !activity) {
            return { message: "No session or activity data found" };
        }

        const summary: ActivitySummary = {};

        if (session) {
            // Note: @garmin/fitsdk uses camelCase field names
            summary.sport =
                typeof session.sport === "string" ? session.sport : "Unknown";
            summary.totalElapsedTime =
                typeof session.totalElapsedTime === "number"
                    ? this.formatDuration(session.totalElapsedTime)
                    : null;
            summary.totalDistance =
                typeof session.totalDistance === "number"
                    ? `${(session.totalDistance / 1000).toFixed(2)} km`
                    : null;
            summary.avgSpeed =
                typeof session.avgSpeed === "number"
                    ? `${(session.avgSpeed * 3.6).toFixed(1)} km/h`
                    : null;
            summary.maxSpeed =
                typeof session.maxSpeed === "number"
                    ? `${(session.maxSpeed * 3.6).toFixed(1)} km/h`
                    : null;
            summary.totalCalories =
                typeof session.totalCalories === "number"
                    ? session.totalCalories
                    : null;
            summary.avgHeartRate =
                typeof session.avgHeartRate === "number"
                    ? session.avgHeartRate
                    : null;
            summary.maxHeartRate =
                typeof session.maxHeartRate === "number"
                    ? session.maxHeartRate
                    : null;
            summary.startTime =
                session.startTime instanceof Date
                    ? session.startTime.toLocaleString()
                    : null;
        }

        return summary;
    }

    /**
     * Extract GPS track data
     */
    extractGpsData(records: FitMessage[] = []): GpsPoint[] {
        return records
            .filter(
                (record) => "positionLat" in record && "positionLong" in record
            )
            .map((record) => ({
                // @garmin/fitsdk automatically converts semicircles to degrees
                lat: record.positionLat as number,
                lng: record.positionLong as number,
                elevation:
                    typeof record.altitude === "number"
                        ? record.altitude
                        : null,
                timestamp:
                    record.timestamp instanceof Date ? record.timestamp : null,
            }));
    }

    /**
     * Extract heart rate data
     */
    extractHeartRateData(records: FitMessage[] = []): HeartRateData[] {
        return records
            .filter((record) => "heartRate" in record)
            .map((record) => ({
                heartRate: record.heartRate as number,
                timestamp:
                    record.timestamp instanceof Date ? record.timestamp : null,
            }));
    }

    /**
     * Extract device information
     */
    extractDeviceInfo(devices: FitMessage[] = []): DeviceInfo {
        const device = devices[0];
        if (!device) return { message: "No device information found" };

        return {
            manufacturer:
                typeof device.manufacturer === "string"
                    ? device.manufacturer
                    : "Unknown",
            product:
                typeof device.product === "string" ||
                typeof device.product === "number"
                    ? String(device.product)
                    : "Unknown",
            serialNumber:
                typeof device.serialNumber === "number"
                    ? device.serialNumber
                    : null,
            softwareVersion:
                typeof device.softwareVersion === "number"
                    ? device.softwareVersion
                    : null,
            hardwareVersion:
                typeof device.hardwareVersion === "number"
                    ? device.hardwareVersion
                    : null,
        };
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
