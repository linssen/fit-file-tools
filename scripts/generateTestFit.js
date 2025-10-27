/**
 * Generate a minimal test FIT file for testing purposes
 * This creates a simple activity file with synthetic data - no real personal information
 */

/* eslint-disable no-console */
const { Encoder, Profile } = require("@garmin/fitsdk");
const fs = require("fs");
const path = require("path");

// Create encoder
const encoder = new Encoder();

// File ID Message - identifies the file type
encoder.onMesg(Profile.MesgNum.FILE_ID, {
    type: "activity",
    manufacturer: "garmin",
    product: 1234, // Generic product
    timeCreated: new Date("2024-01-15T10:00:00Z"),
    serialNumber: 123456789,
});

// Device Info Message
encoder.onMesg(Profile.MesgNum.DEVICE_INFO, {
    timestamp: new Date("2024-01-15T10:00:00Z"),
    manufacturer: "garmin",
    product: 1234,
    serialNumber: 123456789,
    softwareVersion: 1.0,
    deviceIndex: 0,
    sourceType: "local",
});

// Add some sample GPS records (simplified route - a small square pattern)
const baseTime = new Date("2024-01-15T10:00:00Z");
const baseLat = 52.37; // Amsterdam-ish (not real location)
const baseLon = 4.89;

for (let i = 0; i < 10; i++) {
    const offsetLat = Math.sin((i / 10) * Math.PI * 2) * 0.001;
    const offsetLon = Math.cos((i / 10) * Math.PI * 2) * 0.001;
    const recordTime = new Date(baseTime.getTime() + i * 540000); // Every 9 minutes

    encoder.onMesg(Profile.MesgNum.RECORD, {
        timestamp: recordTime,
        positionLat: baseLat + offsetLat,
        positionLong: baseLon + offsetLon,
        distance: i * 1050, // 1.05 km increments
        speed: 1.944 + Math.random() * 2, // 1.9-3.9 m/s
        heartRate: 140 + Math.round(Math.random() * 20),
        altitude: 5 + Math.round(Math.random() * 10),
        cadence: 80 + Math.round(Math.random() * 20),
    });
}

// Session Message - summary of the activity
encoder.onMesg(Profile.MesgNum.SESSION, {
    timestamp: new Date("2024-01-15T11:30:00Z"),
    startTime: new Date("2024-01-15T10:00:00Z"),
    totalElapsedTime: 5400, // 90 minutes in seconds
    totalTimerTime: 5400,
    totalDistance: 10500, // 10.5 km in meters
    sport: "cycling",
    subSport: "generic",
    avgSpeed: 1.944, // m/s (7 km/h)
    maxSpeed: 7.0, // m/s (25.2 km/h)
    avgHeartRate: 145,
    maxHeartRate: 175,
    totalCalories: 420,
});

// Activity Message
encoder.onMesg(Profile.MesgNum.ACTIVITY, {
    timestamp: new Date("2024-01-15T11:30:00Z"),
    totalTimerTime: 5400000, // 90 minutes in milliseconds
    numSessions: 1,
    type: "manual",
    event: "activity",
    eventType: "stop",
});

// Get the encoded data
const buffer = encoder.close();

// Write to file
const outputPath = path.join(
    __dirname,
    "..",
    "src",
    "__tests__",
    "fixtures",
    "test-activity.fit"
);
fs.writeFileSync(outputPath, buffer);

console.log(`✅ Generated test FIT file: ${outputPath}`);
console.log(`📦 File size: ${buffer.byteLength} bytes`);

