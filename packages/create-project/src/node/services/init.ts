import { createProjectLogger } from '../logger.js'
import { hyphenCased } from '@gestaltjs/core/common/string'
import { joinPath } from '@gestaltjs/core/node/path'
import {
  inTemporarydirectory,
  makeDirectory,
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
import { initGitRepository, isGitAvailable } from '@gestaltjs/core/node/git'
import { encodeJson } from '@gestaltjs/core/node/json'
import { getVersionForGeneratedProject } from '../utilities/versions.js'
import { getLocalPackagesOverrides } from '../utilities/packages.js'
import { pnpmInstall } from '@gestaltjs/core/node/pnpm'

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
    await initDirectories(temporaryDirectory)
    await initPackageJson(temporaryDirectory, options)
    await initREADME(temporaryDirectory, options)
    await initGestaltConfig(temporaryDirectory, options.name)
    await initTSConfig(temporaryDirectory)
    await initGitignore(temporaryDirectory)
    await moveFileOrDirectory(temporaryDirectory, projectDirectory)
  })

  if (await isGitAvailable()) {
    await initGitRepository({ branch: 'main', directory: projectDirectory })
  }

  await pnpmInstall({
    directory: projectDirectory,
    stderr: process.stdout,
    stdout: process.stderr,
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

/**
 * Creates the directory hierarchy.
 * @param directory {string} Absolute path to the project directory.
 */
export async function initDirectories(directory: string) {
  const directories = [
    '_build',
    'assets',
    'priv',
    'config',
    'src/models',
    'src/controllers',
    'src/views',
    'src/components',
  ]
  for (const directoryName of directories) {
    const directoryPath = joinPath(directory, directoryName)
    createProjectLogger().debug(`Creating directory: ${directoryPath}`)
    const gitkeepPath = joinPath(directoryPath, '.gitkeep')
    await makeDirectory(directoryPath)
    await writeFile(gitkeepPath, '')
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
    type: 'module',
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

async function initGestaltConfig(directory: string, projectName: string) {
  const gestaltConfigPath = joinPath(directory, 'gestalt.config.ts')
  const content = `import { defineConfiguration } from "gestaltjs/configuration"

export default defineConfiguration(() => ({
  name: "${projectName}",
  plugins: []
}))
`
  await writeFile(gestaltConfigPath, content)
}

async function initTSConfig(directory: string) {
  const tsconfigPath = joinPath(directory, 'tsconfig.json')
  // TODO: Make it extend from a tsconfig generated.
  const tsconfig = {
    compileOnSave: false,
    compilerOptions: {
      lib: ['ES2020'],
      module: 'ES2020',
      target: 'ES2020',
      moduleResolution: 'nodenext',
      esModuleInterop: true,
      strict: true,
      strictNullChecks: true,
      resolveJsonModule: true,
      inlineSourceMap: false,
      isolatedModules: false,
    },
    exclude: ['dist/**', '**/*/vitest.config.ts', 'node_modules'],
  }

  await writeFile(tsconfigPath, encodeJson(tsconfig, null, 2))
}

async function initGitignore(directory: string) {
  const content = `
### macOS ###
# General
.DS_Store
.AppleDouble
.LSOverride

# Icon must end with two \r
Icon


# Thumbnails
._*

# Files that might appear in the root of a volume
.DocumentRevisions-V100
.fseventsd
.Spotlight-V100
.TemporaryItems
.Trashes
.VolumeIcon.icns
.com.apple.timemachine.donotpresent

# Directories potentially created on remote AFP share
.AppleDB
.AppleDesktop
Network Trash Folder
Temporary Items
.apdisk

### Node ###
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
.pnpm-debug.log*

# Diagnostic reports (https://nodejs.org/api/report.html)
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage
*.lcov

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# dotenv environment variables file
.env
.env.test
.env.production

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# Optional stylelint cache
.stylelintcache


# Gestalt
_build
_types
`
  await writeFile(joinPath(directory, '.gitignore'), content)
}
