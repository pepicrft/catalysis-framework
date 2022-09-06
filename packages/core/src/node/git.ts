import { coreLogger } from './logger.js'
import { exec } from './system.js'

/**
 * Returns true if Git is available in the current environment.
 * @returns {Promise<boolean>} A promise that resolves with a value
 *   indicating whether Git is present in the environment.
 */
export async function isGitAvailable(): Promise<boolean> {
  try {
    await exec('git', ['-v'])
    return true
  } catch {
    return false
  }
}

/**
 * Options to initialize a Git repository.
 */
export type InitGitRepositoryOptions = {
  /**
   * The branch the repository is initialized with.
   */
  branch?: string

  /**
   * Directory where the Git repository will be initialized
   */
  directory: string
}

/**
 * Initializes a Git repository.
 * @param options {InitGitRepositoryOptions} Options to customize the initialization.
 */
export async function initGitRepository(
  options: InitGitRepositoryOptions
): Promise<void> {
  coreLogger().debug(`Initializing Git repository at ${options.directory}`)
  let args = ['init']
  if (options.branch) {
    args = args.concat(['-b', options.branch])
  }
  await exec('git', args, { cwd: options.directory })
}
