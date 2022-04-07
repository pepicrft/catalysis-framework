import { createServer } from 'vite'
import { configurationFileName } from '$cli/constants'
import { findUp as findPathUp } from '$cli/path'
import Configuration from '$shared/configuration'

export type LoadOptions = {
  alias?: { find: string; replacement: string }[]
}

export async function load(
  configurationPath: string,
  options: LoadOptions = {}
): Promise<Configuration> {
  const vite = await createServer({
    server: { middlewareMode: 'ssr' },
    resolve: {
      alias: options?.alias ?? [],
    },
    optimizeDeps: {
      entries: [],
    },
  })
  const module = await vite.ssrLoadModule(configurationPath)
  return module.default as Configuration
}

/**
 * Given a directory that represents the root of a Gestalt app, it returns
 * the path to the configuration file.
 * @param directory {string} Directory where to locate the configuration file.
 * @returns A promise that resolves with the path if the file could be located.
 */
export async function lookupConfigurationPathTraversing(
  fromDirectory: string
): Promise<string | undefined> {
  return await findPathUp(
    [`${configurationFileName}.ts`, `${configurationFileName}.js`],
    { type: 'file', cwd: fromDirectory }
  )
}
