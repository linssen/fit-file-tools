// Jest setup file
// No import needed for jest-environment-jsdom, it's configured in jest.config.js

// Mock File API for testing
global.FileReader = class {
    constructor() {
        this.result = null;
        this.error = null;
        this.readyState = 0;
        this.onload = null;
        this.onerror = null;
    }

    readAsArrayBuffer(file) {
        // Simulate async file reading
        setTimeout(() => {
            if (this.onload) {
                this.result = new ArrayBuffer(file.size || 1024);
                this.onload({ target: { result: this.result } });
            }
        }, 10);
    }
};

// Mock Buffer for browser environment
if (typeof global.Buffer === "undefined") {
    global.Buffer = require("buffer").Buffer;
}
