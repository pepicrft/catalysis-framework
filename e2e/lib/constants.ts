import path from 'pathe'

export const rootDirectory = path.join(__dirname, '../..')
export const gestaltPackageDirectory = path.resolve(
  rootDirectory,
  './packages/gesatltjs'
)
export const createProjectPackageDirectory = path.resolve(
  rootDirectory,
  './packages/create-project'
)

export const createPluginPackageDirectory = path.resolve(
  rootDirectory,
  './packages/create-plugin'
)

export const gestaltExecutablePath = path.resolve(
  gestaltPackageDirectory,
  './bin/dev.js'
)
export const createProjectExecutablePath = path.resolve(
  createProjectPackageDirectory,
  './bin/dev.js'
)
export const createPluginExecutablePath = path.resolve(
  createPluginPackageDirectory,
  './bin/dev.js'
)
