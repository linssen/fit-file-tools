import { Encoder, Profile } from "@garmin/fitsdk";

/**
 * Interface for device field modifications
 */
export interface DeviceModifications {
    manufacturer?: number;
    product?: number;
    serialNumber?: number;
    softwareVersion?: number;
}

/**
 * Interface for all supported field modifications
 */
export interface FieldModifications {
    device?: DeviceModifications;
    // Future: Add more field categories here (activity, session, etc.)
}

/**
 * FIT File Encoder class
 * Handles encoding FIT files with modified field values using @garmin/fitsdk
 */
export class FitFileEncoder {
    /**
     * Encode a FIT file with modified fields
     * Takes the raw decoded messages and applies modifications, then encodes to binary
     */
    encodeWithModifications(
        rawMessages: Record<string, unknown[]>,
        modifications: FieldModifications
    ): Uint8Array {
        const encoder = new Encoder();

        // Process all message types in the correct order for a valid FIT file
        const messageOrder = [
            "fileIdMesgs",
            "fileCreatorMesgs",
            "deviceInfoMesgs",
            "userProfileMesgs",
            "eventMesgs",
            "recordMesgs",
            "lapMesgs",
            "sessionMesgs",
            "activityMesgs",
        ];

        // Process messages in order
        for (const mesgType of messageOrder) {
            const messages = rawMessages[mesgType] as unknown[] | undefined;
            if (messages && Array.isArray(messages)) {
                for (const message of messages) {
                    this.writeMessage(
                        encoder,
                        mesgType,
                        message,
                        modifications
                    );
                }
            }
        }

        // Process any remaining message types not in the standard order
        for (const [mesgType, messages] of Object.entries(rawMessages)) {
            if (!messageOrder.includes(mesgType) && Array.isArray(messages)) {
                for (const message of messages) {
                    this.writeMessage(
                        encoder,
                        mesgType,
                        message,
                        modifications
                    );
                }
            }
        }

        return encoder.close();
    }

    /**
     * Write a single message to the encoder, applying modifications if applicable
     */
    private writeMessage(
        encoder: Encoder,
        mesgType: string,
        message: unknown,
        modifications: FieldModifications
    ): void {
        const mesgNum = this.getMesgNum(mesgType);
        if (mesgNum === undefined) {
            console.warn(`Unknown message type: ${mesgType}`);
            return;
        }

        // Clone the message to avoid modifying the original
        // Use a proper deep clone for complex objects including Dates
        const modifiedMessage = this.cloneMessage(
            message as Record<string, unknown>
        );

        // Apply modifications based on message type
        if (mesgType === "deviceInfoMesgs" && modifications.device) {
            this.applyDeviceModifications(
                modifiedMessage,
                modifications.device
            );
        }

        // Clean the message: remove undefined values and non-serializable fields
        // The FIT encoder can't handle undefined values
        const cleanedMessage = this.cleanMessageForEncoder(modifiedMessage);

        // Write the message using onMesg
        // onMesg takes the message number and message separately
        try {
            encoder.onMesg(mesgNum, cleanedMessage);
        } catch (error) {
            console.error(`Error encoding message type ${mesgType}:`, error);
            console.error("Message that failed:", cleanedMessage);
            throw new Error(
                `Failed to encode ${mesgType}: ${error instanceof Error ? error.message : String(error)}`
            );
        }
    }

    /**
     * Clean a message for the encoder by removing undefined values
     * and ensuring all values are serializable
     */
    private cleanMessageForEncoder(
        message: Record<string, unknown>
    ): Record<string, unknown> {
        const cleaned: Record<string, unknown> = {};

        for (const [key, value] of Object.entries(message)) {
            // Skip undefined values - the encoder can't handle them
            if (value === undefined) {
                continue;
            }

            // Skip mesgNum if it exists (will be passed separately to onMesg)
            if (key === "mesgNum") {
                continue;
            }

            // Skip developerFields - they require special registration with encoder.addDeveloperField()
            // For now, we don't support modifying developer fields
            if (key === "developerFields") {
                continue;
            }

            cleaned[key] = value;
        }

        return cleaned;
    }

    /**
     * Clone a message object properly, preserving Date objects and other types
     */
    private cloneMessage(
        message: Record<string, unknown>
    ): Record<string, unknown> {
        const cloned: Record<string, unknown> = {};

        for (const [key, value] of Object.entries(message)) {
            if (value instanceof Date) {
                // Preserve Date objects
                cloned[key] = new Date(value);
            } else if (value === null || value === undefined) {
                // Preserve null/undefined
                cloned[key] = value;
            } else if (typeof value === "object" && !Array.isArray(value)) {
                // Deep clone nested objects (rare in FIT messages)
                cloned[key] = this.cloneMessage(
                    value as Record<string, unknown>
                );
            } else {
                // Primitives and arrays
                cloned[key] = value;
            }
        }

        return cloned;
    }

    /**
     * Apply device field modifications to a device info message
     */
    private applyDeviceModifications(
        message: Record<string, unknown>,
        modifications: DeviceModifications
    ): void {
        // Apply numeric manufacturer ID
        if (modifications.manufacturer !== undefined) {
            message.manufacturer = modifications.manufacturer;
        }

        // Apply numeric product ID
        if (modifications.product !== undefined) {
            message.product = modifications.product;
        }

        if (modifications.serialNumber !== undefined) {
            message.serialNumber = modifications.serialNumber;
        }
        if (modifications.softwareVersion !== undefined) {
            message.softwareVersion = modifications.softwareVersion;
        }
    }

    /**
     * Get the message number for a message type string
     */
    private getMesgNum(mesgType: string): number | undefined {
        // Map message type names to Profile.MesgNum constants
        const mesgTypeMap: Record<string, number> = {
            fileIdMesgs: Profile.MesgNum.FILE_ID,
            fileCreatorMesgs: Profile.MesgNum.FILE_CREATOR,
            timestampCorrelationMesgs: Profile.MesgNum.TIMESTAMP_CORRELATION,
            softwareMesgs: Profile.MesgNum.SOFTWARE,
            slaveDeviceMesgs: Profile.MesgNum.SLAVE_DEVICE,
            capabilitiesMesgs: Profile.MesgNum.CAPABILITIES,
            fileCapabilitiesMesgs: Profile.MesgNum.FILE_CAPABILITIES,
            mesgCapabilitiesMesgs: Profile.MesgNum.MESG_CAPABILITIES,
            fieldCapabilitiesMesgs: Profile.MesgNum.FIELD_CAPABILITIES,
            deviceSettingsMesgs: Profile.MesgNum.DEVICE_SETTINGS,
            userProfileMesgs: Profile.MesgNum.USER_PROFILE,
            hrmProfileMesgs: Profile.MesgNum.HRM_PROFILE,
            sdmProfileMesgs: Profile.MesgNum.SDM_PROFILE,
            bikeProfileMesgs: Profile.MesgNum.BIKE_PROFILE,
            zonesTargetMesgs: Profile.MesgNum.ZONES_TARGET,
            sportMesgs: Profile.MesgNum.SPORT,
            hrZoneMesgs: Profile.MesgNum.HR_ZONE,
            speedZoneMesgs: Profile.MesgNum.SPEED_ZONE,
            cadenceZoneMesgs: Profile.MesgNum.CADENCE_ZONE,
            powerZoneMesgs: Profile.MesgNum.POWER_ZONE,
            metZoneMesgs: Profile.MesgNum.MET_ZONE,
            goalMesgs: Profile.MesgNum.GOAL,
            activityMesgs: Profile.MesgNum.ACTIVITY,
            sessionMesgs: Profile.MesgNum.SESSION,
            lapMesgs: Profile.MesgNum.LAP,
            lengthMesgs: Profile.MesgNum.LENGTH,
            recordMesgs: Profile.MesgNum.RECORD,
            eventMesgs: Profile.MesgNum.EVENT,
            deviceInfoMesgs: Profile.MesgNum.DEVICE_INFO,
            trainingFileMesgs: Profile.MesgNum.TRAINING_FILE,
            hrvMesgs: Profile.MesgNum.HRV,
            coursePointMesgs: Profile.MesgNum.COURSE_POINT,
            courseMesgs: Profile.MesgNum.COURSE,
            segmentIdMesgs: Profile.MesgNum.SEGMENT_ID,
            segmentLeaderboardEntryMesgs:
                Profile.MesgNum.SEGMENT_LEADERBOARD_ENTRY,
            segmentPointMesgs: Profile.MesgNum.SEGMENT_POINT,
            segmentLapMesgs: Profile.MesgNum.SEGMENT_LAP,
            segmentFileMesgs: Profile.MesgNum.SEGMENT_FILE,
            workoutMesgs: Profile.MesgNum.WORKOUT,
            workoutStepMesgs: Profile.MesgNum.WORKOUT_STEP,
            scheduleMesgs: Profile.MesgNum.SCHEDULE,
            totals: Profile.MesgNum.TOTALS,
            weightScaleMesgs: Profile.MesgNum.WEIGHT_SCALE,
            bloodPressureMesgs: Profile.MesgNum.BLOOD_PRESSURE,
            monitoringInfoMesgs: Profile.MesgNum.MONITORING_INFO,
            monitoringMesgs: Profile.MesgNum.MONITORING,
            gpsMetadataMesgs: Profile.MesgNum.GPS_METADATA,
            padMesgs: Profile.MesgNum.PAD,
            memoGlobMesgs: Profile.MesgNum.MEMO_GLOB,
            developerDataIdMesgs: Profile.MesgNum.DEVELOPER_DATA_ID,
            fieldDescriptionMesgs: Profile.MesgNum.FIELD_DESCRIPTION,
        };

        return mesgTypeMap[mesgType];
    }

    /**
     * Create a download for a modified FIT file
     */
    createDownload(data: Uint8Array, originalFilename: string): void {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const blob = new Blob([data as any], {
            type: "application/octet-stream",
        });
        const url = URL.createObjectURL(blob);

        // Generate filename: originalname_modified.fit
        const baseName = originalFilename.replace(/\.fit$/i, "");
        const newFilename = `${baseName}_modified.fit`;

        // Create temporary download link
        const link = document.createElement("a");
        link.href = url;
        link.download = newFilename;
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}

export default FitFileEncoder;
