import path from "node:path"

import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'
import dynamicImport from 'vite-plugin-dynamic-import'
import Analyze from 'rollup-plugin-analyze'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        legacy({
            modernPolyfills: ['es/global-this']
        }),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: false
            },
            strategies: 'injectManifest',
            injectManifest: {
                swSrc: path.resolve(__dirname, 'src/serviceworker.js'),
                swDest: 'serviceworker.js'
            }
        }),
        dynamicImport(),
        Analyze()
    ],
    assetsInclude: [
        "*.html"
    ],
    build: {
        commonjsOptions: {
            transformMixedEsModules: true
        }
    },
})
