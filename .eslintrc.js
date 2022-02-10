module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-strongly-recommended',
        'prettier',
    ],
    plugins: ['prettier'],
    rules: {
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
        'linebreak-style': ['error', 'unix'],
        quotes: [
            'error',
            'single',
            {
                avoidEscape: true,
            },
        ],
        'no-empty': [
            'error',
            {
                allowEmptyCatch: true,
            },
        ],
        semi: 0,
        'no-undef': 0,
        'no-console': 0,
        'vue/html-indent': ['error', 4],
        'vue/max-attributes-per-line': 0,
    },
};
