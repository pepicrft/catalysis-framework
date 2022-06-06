import { Abort } from '../shared/error'
import { exec } from '../cli/system'
import { findPathUp, parentDirectory } from './path'
import { fileURLToPath } from 'url'

export const TSCNotFoundError = () => {
  return new Abort('Could not locate typescript compiler', { next: '' })
}

/**
 * Invokes the Typescript compiler as a child process passing the given arguments.
 * @param args {string[]} Arguments to pass to the Typescript compiler.
 * @param cwd {string} Working directory from where the process will be executed.
 */
export async function runTypescriptCompiler(args: string[], cwd?: string) {
  const __dirname = parentDirectory(fileURLToPath(import.meta.url))
  const tscPath = await findPathUp('node_modules/.bin/tsc', { cwd: __dirname })
  if (!tscPath) {
    throw TSCNotFoundError()
  }
  await exec(tscPath, args, { stdio: 'inherit', cwd })
}
