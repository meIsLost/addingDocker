import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/v1": {
        target: "http://localhost:8080", // Your backend
        changeOrigin: true, // Needed for virtual hosted sites
        secure: false, // Allow HTTP for development
      },
      '/uploads': 'http://localhost:8080',
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "login.html"),
        signup: resolve(__dirname, "signup.html"),
        create: resolve(__dirname, "create.html"),
        update: resolve(__dirname, "update.html"),
      },
    },
  },
});
