import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
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
    vue(),
    cesium(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router'],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
