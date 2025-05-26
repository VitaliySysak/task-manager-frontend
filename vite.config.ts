import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "./",

  plugins: [react(), tailwindcss(), sentryVitePlugin({
    org: "vitaliy-nj",
    project: "javascript-react"
  })],

  server: {
    port: 3000,
    allowedHosts: ["task-manager.space"],
  },

  preview: {
    host: true,
    port: 3000,
    allowedHosts: ["task-manager.space"],
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },

  build: {
    sourcemap: true
  }
});