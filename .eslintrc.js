module.exports = {
    env: {
        node: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',  // Style guide dasar ESLint
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'script',  // Karena type: "commonjs" di package.json
    },
    rules: {
        'no-console': 'off',  // Izinkan console.log
        'indent': ['error', 4],  // Indentasi 4 spasi
        'quotes': ['error', 'double'],  // Gunakan double quotes
    },
};