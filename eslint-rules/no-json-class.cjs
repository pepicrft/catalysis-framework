// https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-json.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { READ, ReferenceTracker } = require('eslint-utils')

module.exports = {
  meta: {
    docs: {
      description:
        'Disallow the usage of the JSON class in favor of the json module in @catalysisdev/json',
      category: 'ES5',
      recommended: false,
      url: 'http://mysticatea.github.io/eslint-plugin-es/rules/no-json.html',
    },
    fixable: null,
    messages: {
      forbidden:
        "'{{name}}' class is forbidden. Use the module @catalysisdev/node/json instead.",
    },
    schema: [],
    type: 'problem',
  },
  create(context) {
    return {
      'Program:exit'() {
        const tracker = new ReferenceTracker(context.getScope())
        for (const { node, path } of tracker.iterateGlobalReferences({
          JSON: { [READ]: true },
        })) {
          context.report({
            node,
            messageId: 'forbidden',
            data: { name: path.join('.') },
          })
        }
      },
    }
  },
}
