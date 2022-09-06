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
import {
  chooseDirectoryToken,
  commandToken,
  content,
  contentBox,
  pathToken,
} from '@gestaltjs/core/node/logger'
import { getUsername } from '@gestaltjs/core/node/environment'
import { encodeJson } from '@gestaltjs/core/node/json'
import { getVersionForGeneratedProject } from '../utilities/versions.js'
import { getLocalPackagesOverrides } from '../utilities/packages.js'

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
  const projectDirectory = joinPath(options.directory, options.name)
  await ensureProjectDirectoryAbsence(projectDirectory)

  await inTemporarydirectory(async (temporaryDirectory) => {
    await initPackageJson(temporaryDirectory, options)
    await initREADME(temporaryDirectory, options)
    await moveFileOrDirectory(temporaryDirectory, projectDirectory)
  })

  createProjectLogger().info(
    contentBox(
      'success',
      `The project ${options.name} has been initialized`,
      content`· Choose the project directory with ${chooseDirectoryToken(
        projectDirectory
      )}\n· Run ${commandToken(`pnpm dev`)}\n· Run ${commandToken(
        `pnpm info`
      )} to familiarize with the commands`,
      'Be creative ✨. We are the catalyst to make your ideas thrive.'
    )
  )
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
      gestaltjs: await getVersionForGeneratedProject(),
    },
    author: await getUsername(),
  }
  if (options.local) {
    const packageOverrides = await getLocalPackagesOverrides()
    packageJson = {
      ...packageJson,
      resolutions: packageOverrides,
      overrides: packageOverrides,
    }
  }

  const packageJsonPath = joinPath(directory, 'package.json')
  await writeFile(packageJsonPath, encodeJson(packageJson, undefined, 2))
}

export async function initREADME(
  directory: string,
  options: InitServiceOptions
) {
  const content = `
# ${options.name}

This repository contains a [Gestalt](https://gestaltjs.org) project.

## Development

1. Clone the repository.
2. Install dependencies with \`pnpm install\`
3. Run \`pnpm dev\`.
4. Enjoy 🚀

## Resources

- [Gestalt](https://gestaltjs.org)
- [NPM registry](https://npmjs.com)
  `
  await writeFile(joinPath(directory, 'README.md'), content)
}
