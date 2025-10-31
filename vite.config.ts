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
});
