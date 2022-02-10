module.exports = {
    preset: 'vite-jest',

    testMatch: [
        '**/tests/unit/**/*.spec.(mjs|jsx)',
        '**/__tests__/*.(mjs|jsx)',
    ],
    testEnvironment: 'jest-environment-jsdom',
};
