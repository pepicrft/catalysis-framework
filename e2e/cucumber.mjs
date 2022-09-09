const featureToRun = process.env.FEATURE

const common = {
  import: ['world/**/*.ts', 'steps/**/*.ts', 'lib/**/*.ts'],
  formatOptions: { colorsEnabled: true },
}

// eslint-disable-next-line import/no-default-export
export default {
  ...common,
  format: ['progress', '@cucumber/pretty-formatter'],
  paths: featureToRun ? [featureToRun] : ['features/**/*.feature'],
}
