import { createServer } from 'vite'
import { configurationFileName } from '../../constants'
import { join as pathJoin } from '../../path'
import { exists as fileExists } from '../../fs'

export default async function loadConfig(directory: string) {
  const vite = await createServer({
    server: { middlewareMode: 'ssr' },
  })
  // const configurationFilePath = locateConfiguration(directory) as string

  const { render } = await vite.ssrLoadModule('configurationFilePath')
}

/**
 * Given a directory that represents the root of a Gestalt app, it returns
 * the path to the configuration file.
 * @param directory {string} Directory where to locate the configuration file.
 * @returns A promise that resolves with the path if the file could be located.
 */
export async function locateConfiguration(
  directory: string
): Promise<string | undefined> {
  const extensions = ['ts', 'js']
  const configurationFilePaths = extensions.map((extension) =>
    pathJoin(directory, `${configurationFileName}.${extension}`)
  )
  for (const configurationPath in configurationFilePaths) {
    if (await fileExists(configurationPath)) {
      return configurationPath
    }
  }
}
