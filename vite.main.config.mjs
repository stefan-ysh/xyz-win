import { defineConfig } from "vite";

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    // 一些可以同时在 Web 和 Node.js 中运行的库，
    // 例如 axios ，我们需要告诉 Vite 在 Node.js 上构建它们。
    browserField: false,
    conditions: ["node"],
    mainFields: ["module", "jsnext:main", "jsnext"],
  },
});
