import { findPathUp } from '@catalysisdev/core/node/fs'
import { decodeJSONFile } from '@catalysisdev/core/node/json'
import { absolutePath, moduleDirname } from '@catalysisdev/core/node/path'

/**
 * It returns the version of the catalysisdev dependency that should be use.
 * NOTE that the logic in this function assumes that the dependencies
 * between the packages in this repository is strict and that they are all
 * versioned togehter. If that assumption breaks, we might end up generating
 * projects that point to old versions of catalysisdev.
 *
 * An assumption-free implementation of this function could read the version
 * from the catalysisdev package's package.json at build time, but because we are
 * using the Typescript compiler, we can't do that. We'd need to introduce
 * a transpiler like Babel.
 * @returns {string}
 */
export async function getVersionForGeneratedProject(): Promise<string> {
  const packageJsonPath = (await findPathUp('package.json', {
    type: 'file',
    cwd: moduleDirname(import.meta.url),
  })) as string
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { version } = await decodeJSONFile(absolutePath(packageJsonPath))
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return version
}
