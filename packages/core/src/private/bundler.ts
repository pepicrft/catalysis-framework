import { Abort } from '../public/common/error.js'
import { absolutePath, AbsolutePath } from 'typed-file-system-path'
import { createServer, ViteDevServer } from 'vite'
import { Project, ProjectImpl } from '../public/node/project/models/project.js'
import { content, fileToken } from '../public/node/logger.js'
import { findPathUp } from '../public/node/fs.js'
import { configurationFileName } from '../public/common/constants.js'
import {
  Configuration,
  ConfigurationImpl,
} from '../public/node/project/models/configuration.js'

interface ProjectBundler {
  /**
   * This function loads and returns a project
   */
  load: () => Promise<Project>

  /**
   * Closes the module loader.
   */
  close: () => Promise<void>
}

export async function createProjectBundler(
  fromDirectory: AbsolutePath
): Promise<ProjectBundler> {
  const configurationManifestPath = await lookupConfigurationPathTraversing(
    fromDirectory
  )
  if (!configurationManifestPath) {
    throw new Abort('The config file could not be found', {
      cause:
        'You might be running Gestalt from a directory that does not contain a project',
      next: content`Run the command from a directory that contains a Gestalt project or any subdirectory. Gestalt projects are identified by a directory containing a ${fileToken(
        'gestalt.config.{js,ts}'
      )} configuration file.`,
    })
  }
  const directory = absolutePath(configurationManifestPath.parentDirectory)

  const vite = await createServer({
    root: directory.pathString,
    cacheDir: undefined,
    server: {
      middlewareMode: 'ssr',
    },
    clearScreen: false,
    logLevel: 'silent',
    optimizeDeps: {
      entries: [],
    },
    build: {
      watch: {},
    },
    plugins: [
      {
        name: 'config-watch',
        handleHotUpdate: async (context) => {
          // const watcherKey = Object.keys(watchers).find((pathPrefix) =>
          //   context.file.startsWith(pathPrefix)
          // )
          // if (!watcherKey) {
          //   return context.modules
          // }
          // await watchers[watcherKey](context.file)
          // return context.modules
        },
      },
    ],
  })
  return new ProjectBundlerImplementation({
    vite,
    configurationManifestPath: configurationManifestPath,
  })
}

type ProjectBundlerImplementationConstructorOptions = {
  configurationManifestPath: AbsolutePath
  vite: ViteDevServer
}

class ProjectBundlerImplementation implements ProjectBundler {
  configurationManifestPath: AbsolutePath
  vite: ViteDevServer

  constructor(options: ProjectBundlerImplementationConstructorOptions) {
    this.vite = options.vite
    this.configurationManifestPath = options.configurationManifestPath
  }

  get directory(): AbsolutePath {
    return absolutePath(this.configurationManifestPath.parentDirectory)
  }

  async load(): Promise<Project> {
    try {
      const configurationModule = await this.vite.ssrLoadModule(
        this.configurationManifestPath.pathString
      )
      const configuration = new ConfigurationImpl({
        path: this.configurationManifestPath,
        userConfiguration: configurationModule.default as Configuration,
      })

      const project = new ProjectImpl({
        configuration,
        directory: this.directory,
      })
      return project
    } catch (error: any) {
      this.vite.ssrFixStacktrace(error)
      throw error
    }
  }

  async close() {
    await this.vite.close()
  }
}

/**
 * Given a directory that represents the root of a Gestalt project, it returns
 * the path to the configuration file.
 * @param directory {string} Directory where to locate the configuration file.
 * @returns A promise that resolves with the path if the file could be located.
 */
export async function lookupConfigurationPathTraversing(
  fromDirectory: AbsolutePath
): Promise<AbsolutePath | undefined> {
  const path = await findPathUp(
    [`${configurationFileName}.ts`, `${configurationFileName}.js`],
    { type: 'file', cwd: fromDirectory.pathString }
  )
  return path ? absolutePath(path) : undefined
}
