import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { BUILD_VERSION } from './version';
import path from 'path';
import fs from 'fs';
import tsconfigPaths from 'vite-tsconfig-paths';

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
            entry: `src/index.ts`,
            name: 'Umpteenth',
            formats: ['iife'],
            fileName: () => `umpteenth.${VERSION}.js`,
        },
        rollupOptions: {
            input: `src/index.ts`,
            output: {
                manualChunks: undefined,
            },
        },
    },
    test: {
        environment: 'jsdom',
        globals: true,
    },
    plugins: [tsconfigPaths()],
});
