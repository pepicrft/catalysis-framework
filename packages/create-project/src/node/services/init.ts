import { createProjectLogger } from '../logger.js'
import { hyphenCased } from '@gestaltjs/core/common/string'
import { joinPath } from '@gestaltjs/core/node/path'
import {
  inTemporarydirectory,
  moveFileOrDirectory,
  pathExists,
  writeFile,
} from '@gestaltjs/core/node/fs'
import { Abort } from '@gestaltjs/core/common/error'
import { content, pathToken } from '@gestaltjs/core/node/logger'

/**
 * The version is inlined here at transpilation time so the publishing of new versions of @gestaltjs/create-project
 * brings the version in the repository.
 **/
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { version as gestaltjsVersion } from '../../../../gestaltjs/package.json'
import { getUsername } from '@gestaltjs/core/node/environment'
/**
 * An abort error that's thrown when the user tries to create a project and the directory
 * already exists.
 * @param directory {directory} The absolute path to the already-existing directory.
 * @returns {Abort} An abort error.
 */
export const ProjectDirectoryExistsError = (directory: string) => {
  return new Abort(
    content`The directory ${pathToken(directory)} already exists.`
  )
}

export type InitServiceOptions = {
  /**
   * When true, the generated project should have its Gestalt dependencies
   * pointing to the packages in the repository.
   */
  local: boolean

  /**
   * The name of the project as it was passed by the user through flags or
   * the prompt.
   */
  name: string

  /**
   * The directory where the project's directory will get created.
   */
  directory: string

  /**
   * The package manager to use to install dependencies
   */
  packageManager?: string
}

export async function initService(options: InitServiceOptions) {
  const projectDirectory = joinPath(options.directory)
  await ensureProjectDirectoryAbsence(projectDirectory)
  await inTemporarydirectory(async (temporaryDirectory) => {
    await initPackageJson(temporaryDirectory, options)
    await initREADME(temporaryDirectory, options)
    await moveFileOrDirectory(temporaryDirectory, projectDirectory)
  })
  createProjectLogger().info('it works!')
}

/**
 * It throws an error if the project directory already exists in the system.
 * @param directory {string} Absolute path to the project directory.
 * @throws {ProjectDirectoryExistsError} If the directory already exists.
 */
export async function ensureProjectDirectoryAbsence(directory: string) {
  if (await pathExists(directory)) {
    throw ProjectDirectoryExistsError(directory)
  }
}

export async function initPackageJson(
  directory: string,
  options: InitServiceOptions
) {
  let packageJson: any = {
    name: hyphenCased(options.name),
    private: true,
    license: 'UNLICENSED',
    scripts: {
      dev: 'gestalt dev',
      build: 'gestalt build',
      test: 'gestalt test',
      check: 'gestalt check',
      generate: 'gestalt generate',
      info: 'gestalt info',
      routes: 'gestalt routes',
    },
    dependencies: {
      gestaltjs: gestaltjsVersion,
    },
    author: await getUsername(),
  }
  if (options.local) {
    const overrides = {
      gestaltjs: `file:/`,
    }
    packageJson = {
      ...packageJson,
      resolutions: overrides,
      overrides: overrides,
    }
  }

  const packageJsonPath = joinPath(directory, 'package.json')
  await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))
}

export async function initREADME(
  directory: string,
  options: InitServiceOptions
) {}
