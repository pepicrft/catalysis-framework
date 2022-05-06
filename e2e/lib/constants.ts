import { resolve as pathResolve, join as pathJoin } from 'pathe'

export const rootDirectory = pathJoin(__dirname, '../..')
export const gestaltPackageDirectory = pathResolve(
  rootDirectory,
  './packages/gesatltjs'
)
export const createProjectPackageDirectory = pathResolve(
  rootDirectory,
  './packages/create-project'
)

export const createPluginPackageDirectory = pathResolve(
  rootDirectory,
  './packages/create-plugin'
)

export const gestaltExecutablePath = pathResolve(
  gestaltPackageDirectory,
  './bin/dev.js'
)
export const createProjectExecutablePath = pathResolve(
  createProjectPackageDirectory,
  './bin/dev.js'
)
export const createPluginExecutablePath = pathResolve(
  createPluginPackageDirectory,
  './bin/dev.js'
)
