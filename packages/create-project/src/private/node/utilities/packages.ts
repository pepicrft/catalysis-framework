import { findPathUp } from '@catalysisdev/core/node/fs'
import { decodeJSONFile } from '@catalysisdev/core/node/json'
import {
  absolutePath,
  glob,
  joinPath,
  moduleDirname,
  parentDirectory,
} from '@catalysisdev/core/node/path'

/**
 * When contributing to the Catalysis project, it might be useful to generate projects
 * that point to the packages in this repository. To do so, we need to use the "overrides"
 * section of the package.json. This function returns the overrides for all the packages
 * in this repository.
 * @returns {{[name: string]: string}}
 */
export async function getLocalPackagesOverrides(): Promise<{
  [name: string]: string
}> {
  const packagesDirectory = (await findPathUp('packages', {
    type: 'directory',
    cwd: moduleDirname(import.meta.url),
  })) as string
  const packageJsonPaths = await glob(
    joinPath(packagesDirectory, '*/package.json')
  )
  let entries = await Promise.all(
    packageJsonPaths.map(async (packageJsonPath): Promise<string[]> => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { name } = await decodeJSONFile(absolutePath(packageJsonPath))
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return [name, `file:${parentDirectory(packageJsonPath)}`]
    })
  )
  entries = entries.filter((entry) => {
    return !entry[0].includes('create-') && !entry[0].includes('website')
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Object.fromEntries(entries)
}
