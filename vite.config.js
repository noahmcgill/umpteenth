import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { BUILD_VERSION } from './version';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VERSION = process.env.VERSION ?? BUILD_VERSION;

const outDir = path.resolve(__dirname, `dist`);
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

export default defineConfig({
    build: {
        outDir,
        sourcemap: false,
        lib: {
            entry: `src/packages/index.ts`,
            name: 'Umpteenth',
            formats: ['iife'],
            fileName: () => `bundle.${VERSION}.js`,
        },
        rollupOptions: {
            input: `src/packages/index.ts`,
            output: {
                manualChunks: undefined,
            },
        },
    },
    resolve: {
        alias: {
            '@/': path.resolve(__dirname, './src'),
            '@shared': path.resolve(__dirname, './src/lib'),
        },
    },
    test: {
        environment: 'jsdom',
        globals: true,
    },
});
