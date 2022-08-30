import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import autoprefixer from "autoprefixer"; // postcss
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/styles/variables.scss";',
      },
    },
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: [
            "Android 4.1",
            "iOS 7.1",
            "Chrome > 31",
            "ff > 31",
            "ie >= 8",
            "> 1%",
          ],
          grid: true,
        }),
        {
          // 去除警告: [WARNING] "@charset" must be the first rule in the file
          postcssPlugin: "internal:charset-removal",
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === "charset") {
                atRule.remove();
              }
            },
          },
        },
      ],
    },
  },
  server: {
    host: "0.0.0.0",
    port: 8080,
    https: false,
    proxy: {},
  },
  build: {
    terserOptions: {
      compress: {
        drop_debugger: true,
        drop_console: true,
      },
    },
  },
});
