import { resolve as pathResolve, join as pathJoin } from 'pathe'
import { dirname } from 'pathe'
// eslint-disable-next-line import/no-nodejs-modules
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
export const rootDirectory = pathJoin(__dirname, '../..')

export const gestaltPackageDirectory = pathResolve(
  rootDirectory,
  './packages/gestaltjs'
)
export const createProjectPackageDirectory = pathResolve(
  rootDirectory,
  './packages/create-project'
)

export const gestaltExecutablePath = pathResolve(
  gestaltPackageDirectory,
  './bin/dev.js'
)
export const createProjectExecutablePath = pathResolve(
  createProjectPackageDirectory,
  './bin/dev.js'
)
