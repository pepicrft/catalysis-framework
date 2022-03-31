/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const rulesDirPlugin = require('eslint-plugin-rulesdir');
const path = require("path")

rulesDirPlugin.RULES_DIR = path.join(__dirname, 'eslint-rules');

module.exports = {
    "root": true,
    "parser": "@typescript-eslint/parser",
    "plugins": [
      "@typescript-eslint",
      "rulesdir"
    ],
    "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier"
    ],
    "rules": {
      "no-console": "error",
      "no-useless-catch": "error",
      "rulesdir/noop": "error"
    },
    "env": {
      "node": true,
      "commonjs": true
    },
    "ignorePatterns": [
      "dist",
      "node_modules",
      "bin"
    ]
}
