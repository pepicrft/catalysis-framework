import { RadixRouter } from 'radix3'
import { createRouter } from 'radix3'
import {
  joinPath,
  glob,
  parentDirectory,
  pathBasename,
  relativePath,
  parsePath,
} from '../../../../path.js'
import { pathExists } from '../../../../fs.js'
import { Route } from '../../../../../common/models/targets/web/route.js'

/**
 * Loads the routes of a main target.
 * @param directory {string} Path to the target's directory.
 * @returns A promise that resolves with the router.
 */
export async function loadRoutes(
  directory: string
): Promise<RadixRouter<Route>> {
  const router = createRouter<Route>()
  const uiRouteFilePaths = await getUIRouteFilePaths(directory)

  await Promise.all(
    uiRouteFilePaths.map(async (filePath) => {
      await processUIRoute({
        filePath,
        filePathWithoutExtensions: getFilePathWithoutExtension(filePath),
        router,
        directory,
      })
    })
  )
  return router
}

/**
 * Using glob it gets all the UI routes and returns them. Note that this method doesn't include
 * modules associated to the route like *.ui.list.{js,ts} or *.ui.get.{js,ts}.
 *
 * @param directory {string} Path to the directory containing the routes: {target}/routes
 * @returns {Promise<string[]>} A promise that resolves with the paths to the files representing the routes.
 */
async function getUIRouteFilePaths(directory: string): Promise<string[]> {
  return await glob(joinPath(directory, '**/*.ui.*'), {
    ignore: [
      joinPath(directory, '**/*.list.*'),
      joinPath(directory, '**/*.get.*'),
    ],
  })
}

/**
 * Options to process routes
 */
type ProcessRouteFileOptions = {
  /** The path to the file representing the route */
  filePath: string

  /** File path without the extensions */
  filePathWithoutExtensions: string

  /**
   * The router instance where routes should be registered
   */
  router: RadixRouter<Route>
  /**
   * The path to the directory inside the target containing the routes.
   */
  directory: string
}

/**
 * It processes a UI route and registers it in the router.
 * @param options {ProcessRouteFileOptions} Options to process the route.
 */
async function processUIRoute(options: ProcessRouteFileOptions) {
  const urlPath = getUIRouteURLPath(options)
  const isStatic = options.filePath.includes('.static')
  const getModulePath = await filePathIfExists({
    filePath: options.filePathWithoutExtensions,
    extensions: ['get.ts', 'get.js'],
  })
  const listModulePath = await filePathIfExists({
    filePath: options.filePathWithoutExtensions,
    extensions: ['list.ts', 'list.js'],
  })

  options.router.insert(urlPath, {
    moduleFilePath: options.filePath,
    rendering: isStatic ? 'static' : 'dynamic',
    getModuleFilePath: isStatic ? getModulePath : undefined,
    listModuleFilePath: isStatic ? listModulePath : undefined,
    type: 'ui',
  })
}

/**
 * Options for the filePathIfExists method.
 */
type FilePathIfExistsOptions = {
  /** Base file path to create paths from by appending extensions */
  filePath: string
  /** Extensions to append to create other paths */
  extensions: string[]
}

/**
 * Creates paths appending extensions and iterates through them returning
 * the first one that exists.
 * @param options {FilePathIfExistsOptions} Options
 * @returns {Promise<string|undefine>} A promise that resolves with either a found path or undefined if no paths exists.
 */
async function filePathIfExists(
  options: FilePathIfExistsOptions
): Promise<string | undefined> {
  const pathsToCheck = options.extensions.map(
    (extension) => `${options.filePath}.${extension}`
  )
  for (let i = 0; i < pathsToCheck.length; i++) {
    if (await pathExists(pathsToCheck[i])) {
      return pathsToCheck[i]
    }
  }
}

/**
 * It returns the file path with the extensions stripped.
 * @param filePath {string} The path to the file.
 * @returns {string} The file path without the extensions.
 */
function getFilePathWithoutExtension(filePath: string): string {
  return joinPath(
    parentDirectory(filePath),
    parsePath(pathBasename(filePath)).name
  )
    .replace('.ui.static', '')
    .replace('.ui', '')
}

/**
 * The function returns the path to register the route in the router.
 * @param options {ProcessRouteFileOptions} Route processing options.
 * @returns {string} The path to register a route in the router.
 */
function getUIRouteURLPath(options: ProcessRouteFileOptions): string {
  let urlPath = `/${relativePath(
    options.directory,
    options.filePathWithoutExtensions
  )}`

  if (urlPath.match(/^\/.+\/index$/)) {
    urlPath = urlPath.replace('/index', '')
  }
  if (urlPath.match(/^\/index$/)) {
    urlPath = urlPath.replace('/index', '/')
  }
  urlPath = urlPath.replace(/\[(.+)\]/g, ':$1')
  return urlPath
}
