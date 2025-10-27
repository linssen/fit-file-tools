import FitParser from "fit-file-parser";

interface FitDataRaw {
    sessions?: any[];
    records?: any[];
    activities?: any[];
    devices?: any[];
}

interface ActivitySummary {
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

interface GpsPoint {
    lat: number;
    lng: number;
    elevation: number | null;
    timestamp: Date | null;
}

interface HeartRateData {
    heartRate: number;
    timestamp: Date | null;
}

interface DeviceInfo {
    manufacturer?: string;
    product?: string;
    serialNumber?: number | null;
    softwareVersion?: number | null;
    hardwareVersion?: number | null;
    message?: string;
}

interface OrganizedData {
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

interface ParsedFitData extends OrganizedData {
    success: boolean;
    fileSize: number;
}

/**
 * FIT File Parser wrapper using fit-file-parser library
 * Handles parsing of Garmin FIT files
 */
class FitFileParser {
    private parser: any;

    constructor() {
        this.parser = new FitParser();
    }

    /**
     * Parse a FIT file from ArrayBuffer
     */
    async parse(buffer: ArrayBuffer): Promise<ParsedFitData> {
        try {
            // Convert ArrayBuffer to Buffer for the parser
            const fitBuffer = Buffer.from(buffer);

            // Parse the FIT file
            const fitData: FitDataRaw = this.parser.parse(fitBuffer);

            // Extract and organize the data
            const organized = this.organizeData(fitData);

            return {
                success: true,
                fileSize: buffer.byteLength,
                ...organized,
            };
        } catch (error: any) {
            throw new Error(`Failed to parse FIT file: ${error.message}`);
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
        sessions: any[] = [],
        activities: any[] = []
    ): ActivitySummary {
        const session = sessions[0];
        const activity = activities[0];

        if (!session && !activity) {
            return { message: "No session or activity data found" };
        }

        const summary: ActivitySummary = {};

        if (session) {
            summary.sport = session.sport || "Unknown";
            summary.totalElapsedTime = session.total_elapsed_time
                ? this.formatDuration(session.total_elapsed_time)
                : null;
            summary.totalDistance = session.total_distance
                ? `${(session.total_distance / 1000).toFixed(2)} km`
                : null;
            summary.avgSpeed = session.avg_speed
                ? `${(session.avg_speed * 3.6).toFixed(1)} km/h`
                : null;
            summary.maxSpeed = session.max_speed
                ? `${(session.max_speed * 3.6).toFixed(1)} km/h`
                : null;
            summary.totalCalories = session.total_calories || null;
            summary.avgHeartRate = session.avg_heart_rate || null;
            summary.maxHeartRate = session.max_heart_rate || null;
            summary.startTime = session.start_time
                ? new Date(session.start_time).toLocaleString()
                : null;
        }

        return summary;
    }

    /**
     * Extract GPS track data
     */
    extractGpsData(records: any[] = []): GpsPoint[] {
        return records
            .filter((record) => record.position_lat && record.position_long)
            .map((record) => ({
                lat: this.convertSemicirclesToDegrees(record.position_lat),
                lng: this.convertSemicirclesToDegrees(record.position_long),
                elevation: record.altitude || null,
                timestamp: record.timestamp ? new Date(record.timestamp) : null,
            }));
    }

    /**
     * Extract heart rate data
     */
    extractHeartRateData(records: any[] = []): HeartRateData[] {
        return records
            .filter((record) => record.heart_rate)
            .map((record) => ({
                heartRate: record.heart_rate,
                timestamp: record.timestamp ? new Date(record.timestamp) : null,
            }));
    }

    /**
     * Extract device information
     */
    extractDeviceInfo(devices: any[] = []): DeviceInfo {
        const device = devices[0];
        if (!device) return { message: "No device information found" };

        return {
            manufacturer: device.manufacturer || "Unknown",
            product: device.product || "Unknown",
            serialNumber: device.serial_number || null,
            softwareVersion: device.software_version || null,
            hardwareVersion: device.hardware_version || null,
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
