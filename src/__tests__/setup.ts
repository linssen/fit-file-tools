// Jest setup file
import "jest-environment-jsdom";
import "@testing-library/jest-dom";

// Mock @garmin/fitsdk
jest.mock("@garmin/fitsdk", () => ({
    Decoder: jest.fn(),
    Stream: {
        fromArrayBuffer: jest.fn(),
        fromBuffer: jest.fn(),
        fromByteArray: jest.fn(),
    },
    Encoder: jest.fn(),
    Profile: {
        MesgNum: {},
        types: {
            mesgNum: {},
        },
    },
    Utils: {
        FIT_EPOCH_MS: 631065600000,
        convertDateTimeToDate: (fitDateTime: number) =>
            new Date(fitDateTime * 1000 + 631065600000),
    },
}));

// Mock File API for testing
global.FileReader = class {
    result: ArrayBuffer | null = null;
    error: Error | null = null;
    readyState: number = 0;
    onload:
        | ((event: { target: { result: ArrayBuffer | null } }) => void)
        | null = null;
    onerror: ((event: { target: { error: Error | null } }) => void) | null =
        null;

    readAsArrayBuffer(file: { size?: number }): void {
        // Simulate async file reading
        setTimeout(() => {
            if (this.onload) {
                this.result = new ArrayBuffer(file.size || 1024);
                this.onload({ target: { result: this.result } });
            }
        }, 10);
    }
} as unknown as typeof FileReader;

// Mock Buffer for browser environment
if (typeof global.Buffer === "undefined") {
    global.Buffer = require("buffer").Buffer;
}
