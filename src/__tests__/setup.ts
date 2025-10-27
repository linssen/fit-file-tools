// Jest setup file
import "jest-environment-jsdom";

// Mock File API for testing
global.FileReader = class {
    result: ArrayBuffer | null = null;
    error: Error | null = null;
    readyState: number = 0;
    onload: ((event: any) => void) | null = null;
    onerror: ((event: any) => void) | null = null;

    readAsArrayBuffer(file: any): void {
        // Simulate async file reading
        setTimeout(() => {
            if (this.onload) {
                this.result = new ArrayBuffer(file.size || 1024);
                this.onload({ target: { result: this.result } });
            }
        }, 10);
    }
} as any;

// Mock Buffer for browser environment
if (typeof global.Buffer === "undefined") {
    global.Buffer = require("buffer").Buffer;
}
