module.exports = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup.js"],
    testMatch: [
        "<rootDir>/src/**/__tests__/**/*.test.js",
        "<rootDir>/src/**/__tests__/**/*.spec.js",
        "<rootDir>/src/**/?(*.)(test|spec).js",
    ],
    testPathIgnorePatterns: ["<rootDir>/src/__tests__/setup.js"],
    collectCoverageFrom: [
        "src/**/*.js",
        "!src/**/__tests__/**",
        "!src/index.js",
    ],
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov", "html"],
    transform: {
        "^.+\\.js$": "babel-jest",
    },
    transformIgnorePatterns: ["node_modules/(?!(fit-file-parser|buffer)/)"],
    moduleFileExtensions: ["js", "json"],
    verbose: true,
};
