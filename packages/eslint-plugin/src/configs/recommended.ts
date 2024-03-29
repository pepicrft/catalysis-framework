import { catalysisRules } from './rules/catalysis'

// eslint-disable-next-line import/no-default-export
export default {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    ...catalysisRules,
  },
}
