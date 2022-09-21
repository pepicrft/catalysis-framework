import { findPathUp } from '@gestaltjs/core/node/fs'
import { decodeJsonFile } from '@gestaltjs/core/node/json'
import { moduleDirname } from '@gestaltjs/core/node/path'

/**
 * It returns the version of the gestaltjs dependency that should be use.
 * NOTE that the logic in this function assumes that the dependencies
 * between the packages in this repository is strict and that they are all
 * versioned togehter. If that assumption breaks, we might end up generating
 * projects that point to old versions of gestaltjs.
 *
 * An assumption-free implementation of this function could read the version
 * from the gestaltjs package's package.json at build time, but because we are
 * using the Typescript compiler, we can't do that. We'd need to introduce
 * a transpiler like Babel.
 * @returns {string}
 */
export async function getVersionForGeneratedProject(): Promise<string> {
  const packageJsonPath = (await findPathUp('package.json', {
    type: 'file',
    cwd: moduleDirname(import.meta.url),
  })) as string
  const { version } = await decodeJsonFile(packageJsonPath)
  return version
}
