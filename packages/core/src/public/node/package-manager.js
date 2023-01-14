import { findPathUp } from './fs.js'

/** @typedef { import('./package-manager').findPackageJsonUp } findPackageJsonUp */
/** @typedef { import('./package-manager').FindPackageJsonUpOptions } FindPackageJsonUpOptions */
/** @typedef { import('./package-manager').FindPackageJsonUpOptions } FindPackageJsonUpOptions */
/** @type { findPackageJsonUp } */
export async function findPackageJsonUp(options) {
  const packageJson = await findPathUp('package.json', {
    cwd: options.fromDirectory,
  })
}
