# ESLint rules

**Evolving a software project can be challenging**,
especially in open source projects where contributions come from many diverse sources with more or less context on the project.
If they are not aligned with the conventions and patterns, the code can morph into [spaghetti code](https://en.wikipedia.org/wiki/Spaghetti_code), making maintaining and reasoning about the code harder. Even worse, it manifests as bugs for users.
**We want Gestalt to be easy to contribute and reliable regardless of its scale.**

Projects initially rely on human reviews through [pull requests](https://en.wikipedia.org/wiki/Fork_and_pull_model) to ensure contributions align with the rest of the codebase.
However, relying on humans to do that work can become unmanageable at a particular scale.
Thanks to static code analysis,
we can delegate that responsibility to a tool like [ESLint](https://eslint.org/). ESLint provides an interface to declare rules that run against the code and has a large community of plugins from which we can extend.

### Configuration

All the packages in the repository have ESLint configured through the `eslintConfig` property in their `package.json`. For consistency reasons, all the packages inherit their ESLint configuration from the `.eslintrc.cjs` file at the project's root.
If you want to have a seamless development experience,
we recommend [configuring your code editor](https://**eslint**.org/docs/user-guide/integrations) to run ESLint while editing the code.
We also provide two commands that you can use for running ESLint with and without fixing the fixable issues:

```bash
// Lint
pnpm run lint

// Fix the linting issues
pnpm run lint:fix
```

### Custom rules

If you come across a convention or a best practice that we are not enforcing through an ESLint rule, you can codify it into a local rule. Writing a rule might seem intimidating, but it's easier than it seems, thanks to the excellent tools.

To create a new rule, add it to the `eslint-rules` directory,
for example,
`my-rule.cjs`,
and enable the rule in the `.eslintrc.cjs` configuration file:

```js
module.exports = {
    /*...*/
    "rules": {
        "rulesdir/my-rule": "error"
    }
}
```

A rule exports a Javascript object that contains some metadata and a create function that traverses the AST and errors. You can use the [AST Explorer tool](https://astexplorer.net/) if you want to see how a piece of code is represented as an AST by ESLint. We recommend checking out [this resource](https://eslint.org/docs/developer-guide/working-with-rules) from ESLint to see real examples and learn more about the rules' format.

```js
module.exports = {
    meta: {
      type: 'problem',
      docs: {
        description: 'This is what my-rule does',
      },
      schema: [],
    },
    create(context) {
        return {}
    },
}
```
