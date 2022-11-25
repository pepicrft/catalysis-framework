import { Abort } from '../../public/common/error.js'
import { absolutePath, AbsolutePath } from 'typed-file-system-path'
import { createServer, ViteDevServer, InlineConfig } from 'vite'
import { Project } from '../../public/node/project/project.js'
import { content, fileToken } from '../../public/node/logger.js'
import { findPathUp } from '../../public/node/fs.js'
import { configurationFileName } from '../../public/common/constants.js'
import { Configuration } from '../../public/node/project/configuration.js'
import { ConfigurationImpl } from './project/models/configuration.js'
import { ProjectImpl } from './project/models/project.js'
import { createUnplugin } from 'unplugin'

export function createBuildPlugin() {
  return createUnplugin((options) => {
    return {
      name: 'gestalt-plugin',
    }
  })
}

export interface ProjectBundler {
  /**
   * This function loads and returns a project
   */
  load: () => Promise<Project>

  /**
   * Closes the module loader.
   */
  close: () => Promise<void>
}

type CreateProjectBundlerOptions = {
  /**
   * The bundler creation traverses the directory structure from this directory
   * looking for a project. If it can't find the project it throws.
   */
  fromDirectory: AbsolutePath
  /**
   * Resolve is intended for tests to provide aliases to resolve modules.
   */
  resolve?: InlineConfig['resolve']
}

/**
 * Creates a bundler to load and watch a project.
 * @param options {CreateProjectBundlerOptions} The options to create a bundler.
 * @returns {Promise<ProjectBundler>} A promise that resolves with the project bundler.
 */
export async function createProjectBundler(
  options: CreateProjectBundlerOptions
): Promise<ProjectBundler> {
  const configurationManifestPath = await lookupConfigurationPathTraversing(
    options.fromDirectory
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
  const directory = configurationManifestPath.parentDirectory

  const vite = await createServer({
    root: directory.pathString,
    cacheDir: undefined,
    esbuild: {},
    server: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      middlewareMode: 'true',
    },
    clearScreen: false,
    logLevel: 'silent',
    optimizeDeps: {
      entries: [],
    },
    resolve: options.resolve,
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
  return new ProjectBundlerImpl({
    vite,
    configurationManifestPath: configurationManifestPath,
  })
}

type ProjectBundlerImplementationConstructorOptions = {
  configurationManifestPath: AbsolutePath
  vite: ViteDevServer
}

class ProjectBundlerImpl implements ProjectBundler {
  configurationManifestPath: AbsolutePath
  vite: ViteDevServer

  constructor(options: ProjectBundlerImplementationConstructorOptions) {
    this.vite = options.vite
    this.configurationManifestPath = options.configurationManifestPath
  }

  get directory(): AbsolutePath {
    return this.configurationManifestPath.parentDirectory
  }

  async load(): Promise<Project> {
    try {
      const configuration = await this.loadConfiguration()

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

  /**
   * It transpiles, loads, and returns the project's configuration.
   * @returns {Promise<ConfigurationImpl>} Returns the project configuration.
   */
  private async loadConfiguration() {
    const configurationModule = await this.vite.ssrLoadModule(
      this.configurationManifestPath.pathString
    )
    const configuration = new ConfigurationImpl({
      path: this.configurationManifestPath,
      userConfiguration: (await configurationModule.default()) as Configuration,
    })
    return configuration
  }

  /**
   * When the bundler is used in "watch" mode to be notified about
   * changes in the project, this function can be invoked to stop watching.
   */
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
