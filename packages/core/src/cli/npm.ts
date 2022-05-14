import { Bug } from '../shared/error'
import { join as pathJoin, findUp } from './path'
import { pathExists } from './fs'
import { content, fileToken } from './logger'
import { WriteStream } from 'fs-extra'
import { exec } from './system'

/**
 * A union type that represents the dependency managers that are available in
 * the Javascript ecosystem.
 */
export type DependencyManager = 'npm' | 'yarn' | 'pnpm'

/**
 * A union type that represents the different types of dependencies that can be
 * added to a package.json:
 *   - peer:     peerDependencies
 *   - dev:      devDependencies
 *   - prod:     dependencies
 */
export type DependencyType = 'peer' | 'dev' | 'prod'

/**
 * It represents an error that's thrown when a dependency can't be added because the directory
 * doesn't contain a package.json.
 * @param directory {string} The directory that was expected to contain a package.json
 * @returns {Bug} A bug error.
 */
export const PackageJsonNotFoundError = (directory: string) => {
  return new Bug(
    content`The directory ${fileToken(directory)} doesn't have a ${fileToken(
      `package.json`
    )}.`,
    {}
  )
}

type AddDependencyOptions = {
  /**
   * The directory that contains the package.json where dependencies
   * are defined.
   */
  directory: string

  /**
   * The name of the dependencies to add.
   */
  dependencies: string[]

  /**
   * The dependency manager to use to add the dependencies.
   */
  dependencyManager: DependencyManager

  /**
   * An attribute that represents whether the dependencies
   * should be added to the dependencies, devDependencies, or
   * peerDependencies list of the package.json
   */
  type: DependencyType

  /**
   * A write stream that will receive the standard output
   * coming from the installation process.
   */
  stdout?: WriteStream

  /**
   * A write stream that will receive the standard error
   * coming from the installation process.
   */
  stderr?: WriteStream

  /**
   * An signal to allow the caller to abort the process.
   */
  abortSignal?: AbortSignal
}

/**
 * Adds NPM dependencies to a project.
 * @param options {AddDependencyOptions} Options to add a dependency.
 */
export async function addDependencies(options: AddDependencyOptions) {
  const packageJsonPath = pathJoin(options.directory, 'package.json')
  const packageJsonExists = await pathExists(packageJsonPath)
  if (!packageJsonExists) {
    throw PackageJsonNotFoundError(options.directory)
  }
  let command: string[]
  switch (options.dependencyManager) {
    case 'npm':
      command = ['install']
      switch (options.type) {
        case 'dev':
          command.push('--save-dev')
          break
        case 'peer':
          command.push('--save-peer')
          break
        case 'prod':
          command.push('--save-prod')
          break
      }
      break
    case 'yarn':
      command = ['add']
      switch (options.type) {
        case 'dev':
          command.push('--dev')
          break
        case 'peer':
          command.push('--peer')
          break
        case 'prod':
          command.push('--prod')
          break
      }
      break
    case 'pnpm':
      command = ['add']
      switch (options.type) {
        case 'dev':
          command.push('--save-dev')
          break
        case 'peer':
          command.push('--save-peer')
          break
        case 'prod':
          command.push('--save-prod')
          break
      }
      break
  }
  await exec(options.dependencyManager, command, {
    stderr: options.stderr,
    stdout: options.stdout,
    signal: options.abortSignal,
  })
}

/**
 * Given a directory, it traverses up the directory structure
 * it finds a lockfile that indicates the dependency manager
 * being used. If no lockfile is found, npm is returned as the
 * dependency manager.
 * @param fromDirectory {string}
 * @returns
 */
export async function inferDependencyManager(
  fromDirectory: string
): Promise<DependencyManager> {
  const yarnLockPath = await findUp('yarn.lock', {
    cwd: fromDirectory,
    type: 'file',
  })
  if (yarnLockPath) {
    return 'yarn'
  }
  const pnpmLockPath = await findUp('pnpm-lock.yaml', {
    cwd: fromDirectory,
    type: 'file',
  })
  if (pnpmLockPath) {
    return 'pnpm'
  }
  return 'npm'
}
