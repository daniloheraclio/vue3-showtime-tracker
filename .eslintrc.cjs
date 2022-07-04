/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-prettier'],
  overrides: [
    {
      files: ['*.config.js'],
      env: {
        node: true,
      },
    },
  ],
  rules: {
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'vue/multi-word-component-names': 'off',
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 120,
        //below line only for windows users facing CLRF and eslint/prettier error
        // non windows users feel free to delete it
        endOfLine: 'auto',
      },
    ],
    'no-loss-of-precision': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
