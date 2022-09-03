/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const rulesDirPlugin = require('eslint-plugin-rulesdir')
const path = require('path')

rulesDirPlugin.RULES_DIR = path.join(__dirname, 'eslint-rules')

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'rulesdir', 'import', 'jest'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    'no-console': 'error',
    'no-useless-catch': 'error',
    'rulesdir/noop': 'error',
    'rulesdir/no-json-class': 'error',
    'import/no-nodejs-modules': 'error',
    'import/no-default-export': 'error',
    'no-implicit-globals': 'error',
    'jest/consistent-test-it': [
      'error',
      { fn: 'test', withinDescribe: 'test' },
    ],
  },
  env: {
    node: true,
    commonjs: true,
  },
  ignorePatterns: ['dist', 'node_modules', 'bin'],
}
