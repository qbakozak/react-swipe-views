const js = require('@eslint/js')
const globals = require('globals')
const tseslint = require('typescript-eslint')
const reactHooks = require('eslint-plugin-react-hooks')
const reactRefresh = require('eslint-plugin-react-refresh')
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')

const tseslintConfig = tseslint.config(
  {
    ignores: [
      'dist',
      'package-lock.json',
      'node_modules',
      'public',
      '.plans',
      '.terraform',
      '.snapshots',
      'docs',
      'lib',
      'css',
      "eslint.config.js",
      "vite.config.js",
      "vite.config.npm.js",
    ],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/ban-ts-ignore': 0,
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'always-multiline',
        },
      ],
      'react/prop-types': [0],
      '@typescript-eslint/explicit-function-return-type': [0],
      '@typescript-eslint/interface-name-prefix': 0,
    },
  },
  eslintPluginPrettierRecommended,
)

module.exports = tseslintConfig
