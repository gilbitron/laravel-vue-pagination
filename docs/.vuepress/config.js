import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'

export default defineUserConfig({
    lang: 'en-US',
    title: 'Laravel Vue Pagination',
    description: 'A Vue.js pagination component for Laravel',
    theme: defaultTheme({
        repo: 'https://github.com/gilbitron/laravel-vue-pagination',
        sidebar: {
            '/': [
                {
                    text: 'Getting Started',
                    collapsable: false,
                    children: [
                        '/guide/install.md',
                        '/guide/quick-start.md',
                    ],
                },
                {
                    text: 'Components',
                    collapsable: false,
                    children: [
                        '/components/bootstrap-5.md',
                        '/components/bootstrap-4.md',
                        '/components/tailwind.md',
                    ],
                },
                {
                    text: 'API',
                    collapsable: false,
                    children: [
                        '/api/global-props.md',
                        '/api/bootstrap-props.md',
                        '/api/tailwind-props.md',
                        '/api/events.md',
                        '/api/slots.md',
                    ],
                },
            ],
        },
    }),
})