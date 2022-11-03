import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/lib.js'),
            name: 'LaravelVuePagination',
            fileName: (format) => `laravel-vue-pagination.${format}.js`,
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
    },
});
