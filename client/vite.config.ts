import { resolve } from "path";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  plugins: [mkcert()],
  server: {
    proxy: {
      "/v1": {
        target: "https://localhost:8080",
        changeOrigin: true,
        secure: false, // Disable SSL verification for the proxy
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
