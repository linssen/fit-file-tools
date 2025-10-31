import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "/fit-file-tools/",
    define: {
        global: "globalThis",
    },
    resolve: {
        alias: {
            buffer: "buffer",
        },
    },
    optimizeDeps: {
        esbuildOptions: {
            define: {
                global: "globalThis",
            },
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    // Separate the Garmin FIT SDK into its own chunk
                    "garmin-sdk": ["@garmin/fitsdk"],
                    // Separate Leaflet map library if it grows large
                    leaflet: ["leaflet"],
                    // Vendor chunk for other dependencies
                    vendor: ["react", "react-dom"],
                },
            },
        },
        // Increase the chunk size warning limit if needed after splitting
        chunkSizeWarningLimit: 600,
    },
});
