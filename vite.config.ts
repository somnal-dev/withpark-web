import react from '@vitejs/plugin-react-swc';
import {defineConfig} from 'vite';
import ogPlugin from 'vite-plugin-open-graph';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: [
            {find: '@withpark/api/', replacement: '/src/apis/'},
            {find: '@withpark/router/', replacement: '/src/routers/'},
            {find: '@withpark/page/', replacement: '/src/pages/'},
            {find: '@withpark/template/', replacement: '/src/templates/'},
            {find: '@withpark/component/', replacement: '/src/components/'},
            {find: '@withpark/style/', replacement: '/src/styles/'},
            {find: '@withpark/util/', replacement: '/src/utils/'},
        ],
    },
    plugins: [
        react(),
        svgr(),
        ogPlugin({
            basic: {
                title: '위드파크',
                type: 'website',
                image: {
                    url: '',
                },
                url: 'https://withpark.vercel.app',
                description:
                    '위드파크',
                determiner: 'the',
                locale: 'ko_KR',
                siteName: '위드파크',
            },
        }),
    ],
    server: {
        proxy: {
            '/tmap': {
                target: 'https://apis.openapi.sk.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
