import { Writable } from 'node:stream'
import { AbsolutePath } from 'typed-file-system-path'
import { exec } from './system.js'

/**
 * A type that represents the options that can be passed when running
 * "pnpm" install.
 */
type PNPMInstallOptions = {
  /** Directory containing a package.json */
  directory: AbsolutePath
  /** Stream to forward standard output events */
  stdout?: Writable
  /** Stream to forward standard error events */
  stderr?: Writable
  /** Signal to abort the process */
  signal?: AbortSignal
}

/**
 * Runs 'pnpm' install in a directory containing a package.json.
 * @param options {PNPMInstallOptions} Installation options.
 */
export async function pnpmInstall(options: PNPMInstallOptions) {
  await exec('pnpm', ['install'], {
    cwd: options.directory.pathString,
    stdout: options.stdout,
    stderr: options.stderr,
  })
}

/**
 * A function that returns true if pnpm is present in the environment.
 * @returns {Promise<boolean>} A promise that resolves with true if pnpm is available in the environment.
 */
export async function isPnpmPresent(): Promise<boolean> {
  try {
    await exec('pnpm', ['-h'])
    return true
  } catch {
    return false
  }
}
