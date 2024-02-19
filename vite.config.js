import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
// eslint-disable-next-line no-unused-vars
export default defineConfig(({ command, mode }) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), '')
    return {
        plugins: [
            vue(),
            VitePWA({
                registerType: 'autoUpdate',
                workbox: {
                    globPatterns: ['**/*.{js,css,html,vue,png,svg,woff,woff2,scss,ico,gif}'],
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
                '@': '/src'
            },
        },
        base: 'http://'.concat(env.VITE_FRONTEND_HOST),
        server: {
            host: env.VITE_FRONTEND_HOST ?? 'localhost',
            port: env.VITE_FRONTEND_PORT ?? 5173,
            proxy: {
                '/api': {
                    target: env.VITE_BACKEND_URL,
                    changeOrigin: true,
                    secure: true,
                    ws: false
                }
            },
            hmr: {
                overlay: true
            }
        }
    }
});