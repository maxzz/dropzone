import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import url from '@rollup/plugin-url';
import replace from '@rollup/plugin-replace';
import { visualizer } from 'rollup-plugin-visualizer';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

const buildAt = () => {
    var d = new Date();
    //return `Build ${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}`;
    return `${d.getFullYear().toString().substring(3)}.${d.getMonth() + 1}${d.getDate()} (${d.getHours()}${d.getMinutes()})`;
};

// https://vitejs.dev/config/
export default defineConfig({
    base: '',
    plugins: [
        react(),

        {
            ...url({
                include: ['**/*.svg'],
                limit: 15000,
            }),
            enforce: 'pre',
        },

        replace({
            values: {
                __BUILD_DATE__: buildAt(),
            },
            preventAssignment: true,
        }),

        visualizer({
            filename: 'visualization.html',
            template: 'sunburst', // sunburst - d3 style (good as default as well); treemap - table (default); network - graph (slow to open).
            gzipSize: true,
            brotliSize: true,
        }),

        chunkSplitPlugin({
            customSplitting: {
                //'react-vendor': ['react', 'react-dom'],
                'react-vendor': [/react/, /react-dom/],
                'radix-ui': [/@radix-ui/],
            }
        }),
    ],
    resolve: {
        alias: {
            '@ui': path.resolve(__dirname, './src/components/UI'),
            '@': path.resolve(__dirname, './src'),
        },
    },

    build: {
        minify: "esbuild",
        target: "esnext",
    },

    server: {
        port: 3000,
    },

});
