import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import betterTailwind from 'eslint-plugin-better-tailwindcss';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    ignores: [
      'node_modules',
      '.next',
      'dist',
      'coverage',
      'public',
      '*.config.js',
      '*.config.mjs',
      '*.test.*',
      'jest.config.js',
      'jest.setup.js',
    ],
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.jest,
        React: true,
        crypto: true,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'better-tailwindcss': betterTailwind,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
      'better-tailwindcss': {
        entryPoint: 'src/app/globals.css',
      },
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: ['./tsconfig.json'],
      },
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.jest,
        React: true,
        crypto: true,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...tsPlugin.configs['recommended-type-checked'].rules,
    },
  },
  // Overrides para archivos de test y configuración
  {
    files: ['**/*.test.*', 'jest.config.js', 'jest.setup.js'],
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-prototype-builtins': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]; 