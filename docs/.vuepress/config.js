import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'
import { fileURLToPath } from 'url';

let head = [];
head.push(['meta', { name: 'google-adsense-account', content: 'ca-pub-5665154361628767' }]);
if (process.env.NODE_ENV === 'production') {
    head.push(['script', { src: 'https://cdn.usefathom.com/script.js', 'data-spa': 'auto', 'data-site': 'DIOQPXCP', 'defer': true }]);
}

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
    head: head,
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
                {
                    text: 'Advanced',
                    collapsable: false,
                    children: [
                        '/guide/advanced/renderless-pagination.md',
                    ],
                },
            ],
        },
    }),
})