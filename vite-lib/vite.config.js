import { defineConfig } from "vite";
import path from "path";
import AppPackage from "./package.json";

// =========  https://vitejs.dev/config/  =========
const ProjectPath = path.resolve(process.cwd());
const SrcPath = path.resolve(ProjectPath, "src");

export default defineConfig({
  root: ProjectPath,
  // base: "./",
  resolve: {
    alias: {
      "@": SrcPath,
    },
  },
  plugins: [
    // ...
  ],
  build: {
    target: "chrome75",
    rollupOptions: {
      input: {
        index: path.resolve(ProjectPath, "index.html"),
      },
    },
  },
  define: {
    ViteConst: JSON.stringify({
      AppVersion: AppPackage.version,
      AppName: AppPackage.name,
    }),
  },
  server: {
    host: true,
    port: 9000,
    strictPort: true, // 端口已被占用则会直接退出
    proxy: {},
  },
});
