import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [
      "https://tractile-unsynchronously-letha.ngrok-free.dev", //  domain ngrok
    ],
  },
});
