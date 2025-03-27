import { defineConfig } from 'vite'
import cesium from 'vite-plugin-cesium'
import path from 'path'; // 引入 path 模块

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // 配置 @ 别名指向 src 目录
    }
  },
  // server: {
  //   proxy: {
  //     '/outLab3': {
  //       target: 'http://192.168.1.200/',
  //       changeOrigin: true,
  //     }
  //   }
  // },
  plugins: [
    cesium(),
  ],
})
