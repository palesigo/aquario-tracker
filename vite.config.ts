import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Se fores publicar em GitHub Pages num repositório com nome próprio
// (ex: https://<user>.github.io/aquario-tracker/), define aqui o base path.
export default defineConfig({
  base: '/aquario-tracker/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png'],
      manifest: {
        name: 'Aquário Tracker',
        short_name: 'Aquário',
        description: 'Controlo de trocas de água e filtros do aquário',
        theme_color: '#0d6efd',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/aquario-tracker/',
        scope: '/aquario-tracker/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico}']
      }
    })
  ]
});
