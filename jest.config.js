module.exports = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup.ts"],
    testMatch: [
        "<rootDir>/src/**/__tests__/**/*.test.ts",
        "<rootDir>/src/**/__tests__/**/*.spec.ts",
        "<rootDir>/src/**/__tests__/**/*.test.tsx",
        "<rootDir>/src/**/__tests__/**/*.spec.tsx",
        "<rootDir>/src/**/?(*.)(test|spec).(ts|tsx)",
    ],
    testPathIgnorePatterns: ["<rootDir>/src/__tests__/setup.ts"],
    collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
        "!src/**/__tests__/**",
        "!src/index.ts",
    ],
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov", "html"],
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90,
        },
    },
    transform: {
        "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
    },
    transformIgnorePatterns: [
        "node_modules/(?!(buffer|@garmin)/)",
    ],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
    verbose: true,
};
