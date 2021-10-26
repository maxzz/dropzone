import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { visualizer } from 'rollup-plugin-visualizer';
import url from '@rollup/plugin-url';
import replace from '@rollup/plugin-replace';

// https://vitejs.dev/config/
export default defineConfig({
    base: '',
    plugins: [
        reactRefresh(),

        {
            ...url({
                include: ['**/*.svg'],
                limit: 15000,
            }),
            enforce: 'pre',
        },

        replace({
            __DATE__: new Date().toISOString(),
        }),

        visualizer({
            filename: 'visualization.html',
            template: 'sunburst', // sunburst - d3 style (good as default as well); treemap - table (default); network - graph (slow to open).
            gzipSize: true,
            brotliSize: true,
        }),

    ]
});
