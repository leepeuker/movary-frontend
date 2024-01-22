import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,vue,png,svg,woff,woff2,scss}'],
      },
      manifest: {
        name: 'Movary',
        short_name: 'Movary',
        description: 'Self hosted web app to track and rate your watched movies',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/images/movary-logo-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/images/movary-logo-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
});
