import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import path from "path";

// Vercel serves dist/404.html with a real HTTP 404 for paths that match no file
// and no rewrite. It's the same SPA shell, so React Router renders NotFound.
const spa404Fallback = () => ({
  name: "spa-404-fallback",
  apply: "build" as const,
  closeBundle() {
    const dist = path.resolve(__dirname, "dist");
    fs.copyFileSync(path.join(dist, "index.html"), path.join(dist, "404.html"));
  },
});

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), spa404Fallback()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
