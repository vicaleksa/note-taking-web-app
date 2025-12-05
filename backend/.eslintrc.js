module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    projectService: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  settings: {
    'import/resolver': {
      typescript: {
        directory: './tsconfig.json',
      },
    },
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/strict-type-checked',
  ],
  rules: {
    indent: ['error', 4],
    'max-len': ['error', { code: 120 }],
    'import/prefer-default-export': ['off'],
    'import/no-unresolved': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    '@typescript-eslint/no-floating-promises': 'off',
    "import/extensions": ["error", "never", {
      "js": "never",
      "jsx": "never",
      "json": "always",
      "ts": "never",
      "tsx": "never"
    }]
  },
};
