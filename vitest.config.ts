
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'text-summary'],
            include: ['src/**/*.ts'],
        },
        globals: true,
        root: './',
    },
    plugins: [
        swc.vite({
            module: { type: 'es6' },
        }),
    ],
});
