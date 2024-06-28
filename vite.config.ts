import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';
import { splitVendorChunkPlugin } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Плагин для сжатия файлов
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    // Плагин для визуализации размера бандла
    visualizer() as PluginOption,
    // Плагин для разделения vendor-кода
    splitVendorChunkPlugin(),
  ],
  resolve: {
    alias: {
      '@bem-react/classname': '@bem-react/classname'
    }
  },
  build: {
    // Включаем минификацию
    minify: 'esbuild',
    // Включаем tree-shaking
    // rollupOptions: {
    //   external: ['@bem-react/classname'],
    //   treeshake: true,
    //   output: {
    //     manualChunks(id) {
    //       if (id.includes('node_modules')) {
    //         return 'vendor';
    //       }
    //     },
    //   },
    // },
  },
  cacheDir: 'node_modules/.vite_cache', // Правильное использование кэширования
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
