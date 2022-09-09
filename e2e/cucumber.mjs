const featureToRun = process.env.FEATURE

const common = {
  import: ['world/**/*.ts', 'steps/**/*.ts', 'lib/**/*.ts'],
}

// eslint-disable-next-line import/no-default-export
export default {
  ...common,
  format: ['progress', '@cucumber/pretty-formatter'],
}

// const common = [
//   '--require world/**/*.ts',
//   '--require steps/**/*.ts',
//   '--require lib/**/*.ts',
//   '--format-options \'{"colorsEnabled": true}\'',
// ]
// if (featureToRun) {
//   common.push(featureToRun)
// } else {
//   common.push('features/**/*.feature')
// }

// // eslint-disable-next-line import/no-default-export
// export default common.join('')
