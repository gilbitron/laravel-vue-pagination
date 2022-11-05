import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'
import { fileURLToPath } from 'url';

export default defineUserConfig({
    bundler: viteBundler({
        viteOptions: {
            resolve: {
                alias: {
                    '@': fileURLToPath(new URL('../../src', import.meta.url)),
                },
            },
        },
    }),
    lang: 'en-US',
    title: 'Laravel Vue Pagination',
    description: 'A Vue.js pagination component for Laravel',
    theme: defaultTheme({
        repo: 'https://github.com/gilbitron/laravel-vue-pagination',
        navbar: [
            {
                text: 'Guide',
                link: '/',
            },
            {
                text: 'Demo',
                link: '/demo',
            },
        ],
        sidebar: {
            '/': [
                {
                    text: 'Getting Started',
                    collapsable: false,
                    children: [
                        '/guide/install.md',
                        '/guide/quick-start.md',
                        '/guide/laravel-paginators.md',
                    ],
                },
                {
                    text: 'Components',
                    collapsable: false,
                    children: [
                        '/guide/components/bootstrap-5.md',
                        '/guide/components/bootstrap-4.md',
                        '/guide/components/tailwind.md',
                    ],
                },
                {
                    text: 'API',
                    collapsable: false,
                    children: [
                        '/guide/api/props.md',
                        '/guide/api/events.md',
                        '/guide/api/slots.md',
                    ],
                },
            ],
        },
    }),
})