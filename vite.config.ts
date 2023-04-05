import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dataUrl from '@rollup/plugin-url';
import replace from '@rollup/plugin-replace';
import { visualizer } from 'rollup-plugin-visualizer';
//import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

function manualChunks(id: string) { //https://rollupjs.org/configuration-options/#output-manualchunks
    if (id.includes("@radix-ui")) {
        return "radix-ui";
    }
    if (id.includes("react-dropzone")) {
        return "rare";
    }
    if (id.includes("react-syntax-highlighter")) {
        return "rare";
    }
    if (id.includes("node_modules")) {
        return "vendor";
    }
}

function replaceValues() {
    return {
        __BUILD_DATE__: buildAt(),
    };

    function buildAt() {
        const d = new Date();
        return `${d.getFullYear().toString().substring(3)}.${d.getMonth() + 1}${d.getDate()} (${d.getHours()}${d.getMinutes()})`;
    }
}

export default defineConfig({ // https://vitejs.dev/config
    base: '',
    plugins: [
        react(),

        { ...dataUrl({ include: ['**/*.svg'], limit: 15000, }), enforce: 'pre', },

        replace({ values: replaceValues(), preventAssignment: true, }),

        visualizer({
            filename: 'visualization.html',
            template: 'sunburst', // sunburst - d3 style (good as default as well); treemap - table (default); network - graph (slow to open).
            gzipSize: true,
            brotliSize: true,
        }),

        // chunkSplitPlugin({ // works only w/ "vite-plugin-chunk-split": "0.2.7", but not 0.4.0 and 0.4.7(latest)
        //     customSplitting: {
        //         'react-vendor': ['react', 'react-dom'],
        //         'radix-ui': [/@radix-ui/],
        //     }
        // }),
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

        rollupOptions: {
            output: {
                manualChunks,
            }
        }
    },

    server: {
        port: 3000,
    },

});
