import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astroParser from 'astro-eslint-parser';
import astro from 'eslint-plugin-astro';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    }
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
];
