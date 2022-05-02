import path from 'pathe'

export const rootDirectory = path.join(__dirname, '../..')
export const gestaltPackageDirectory = path.resolve(
  rootDirectory,
  './packages/gesatltjs'
)
export const gestaltExecutablePath = path.resolve(
  gestaltPackageDirectory,
  './bin/dev.js'
)
