declare module "@garmin/fitsdk" {
    export class Stream {
        static fromArrayBuffer(buffer: ArrayBuffer): Stream;
        static fromBuffer(buffer: Buffer): Stream;
        static fromByteArray(bytes: number[]): Stream;
    }

    export interface DecoderOptions {
        mesgListener?: (messageNumber: number, message: unknown) => void;
        mesgDefinitionListener?: (mesgDefinition: unknown) => void;
        fieldDescriptionListener?: (
            key: string,
            developerDataIdMesg: unknown,
            fieldDescriptionMesg: unknown
        ) => void;
        applyScaleAndOffset?: boolean;
        expandSubFields?: boolean;
        expandComponents?: boolean;
        convertTypesToStrings?: boolean;
        convertDateTimesToDates?: boolean;
        includeUnknownData?: boolean;
        mergeHeartRates?: boolean;
        decodeMemoGlobs?: boolean;
    }

    export interface DecoderResult {
        messages: Record<string, unknown[]>;
        errors: Error[];
    }

    export class Decoder {
        constructor(stream: Stream);
        static isFIT(stream: Stream): boolean;
        isFIT(): boolean;
        checkIntegrity(): boolean;
        read(options?: DecoderOptions): DecoderResult;
    }

    export interface EncoderMessage {
        mesgNum?: number;
        [key: string]: unknown;
    }

    export class Encoder {
        constructor();
        onMesg(mesgNum: number, message: Record<string, unknown>): void;
        writeMesg(message: EncoderMessage): void;
        close(): Uint8Array;
    }

    export namespace Profile {
        export enum MesgNum {
            FILE_ID = 0,
            CAPABILITIES = 1,
            DEVICE_SETTINGS = 2,
            USER_PROFILE = 3,
            HRM_PROFILE = 4,
            SDM_PROFILE = 5,
            BIKE_PROFILE = 6,
            ZONES_TARGET = 7,
            HR_ZONE = 8,
            POWER_ZONE = 9,
            MET_ZONE = 10,
            SPORT = 12,
            GOAL = 15,
            SESSION = 18,
            LAP = 19,
            RECORD = 20,
            EVENT = 21,
            DEVICE_INFO = 23,
            WORKOUT = 26,
            WORKOUT_STEP = 27,
            SCHEDULE = 28,
            WEIGHT_SCALE = 30,
            COURSE = 31,
            COURSE_POINT = 32,
            TOTALS = 33,
            ACTIVITY = 34,
            SOFTWARE = 35,
            FILE_CAPABILITIES = 37,
            MESG_CAPABILITIES = 38,
            FIELD_CAPABILITIES = 39,
            FILE_CREATOR = 49,
            BLOOD_PRESSURE = 51,
            SPEED_ZONE = 53,
            MONITORING = 55,
            TRAINING_FILE = 72,
            HRV = 78,
            LENGTH = 101,
            MONITORING_INFO = 103,
            PAD = 105,
            SLAVE_DEVICE = 106,
            CADENCE_ZONE = 131,
            SEGMENT_LAP = 142,
            MEMO_GLOB = 145,
            SEGMENT_ID = 148,
            SEGMENT_LEADERBOARD_ENTRY = 149,
            SEGMENT_POINT = 150,
            SEGMENT_FILE = 151,
            GPS_METADATA = 160,
            CAMERA_EVENT = 161,
            TIMESTAMP_CORRELATION = 162,
            GYROSCOPE_DATA = 164,
            ACCELEROMETER_DATA = 165,
            THREE_D_SENSOR_CALIBRATION = 167,
            VIDEO_FRAME = 169,
            OBDII_DATA = 174,
            NMEA_SENTENCE = 177,
            AVIATION_ATTITUDE = 178,
            VIDEO = 184,
            VIDEO_TITLE = 185,
            VIDEO_DESCRIPTION = 186,
            VIDEO_CLIP = 187,
            SET = 225,
            JUMP = 285,
            CLIMB_PRO = 317,
            FIELD_DESCRIPTION = 206,
            DEVELOPER_DATA_ID = 207,
        }

        export namespace types {
            export const mesgNum: Record<number, string>;
        }
    }

    export namespace Utils {
        export const FIT_EPOCH_MS: number;
        export function convertDateTimeToDate(fitDateTime: number): Date;
    }
}
