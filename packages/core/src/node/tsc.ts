import { Abort } from '../shared/error'
import { exec } from '../cli/system'
import { moduleDirname } from './path'
import { findPathUp } from './fs'

export const TSCNotFoundError = () => {
  return new Abort('Could not locate typescript compiler', { next: '' })
}

/**
 * Invokes the Typescript compiler as a child process passing the given arguments.
 * @param args {string[]} Arguments to pass to the Typescript compiler.
 * @param cwd {string} Working directory from where the process will be executed.
 */
export async function runTypescriptCompiler(args: string[], cwd?: string) {
  const __dirname = moduleDirname(import.meta.url)
  const tscPath = await findPathUp('node_modules/.bin/tsc', {
    fromDirectory: __dirname,
  })
  if (!tscPath) {
    throw TSCNotFoundError()
  }
  await exec(tscPath, args, { stdio: 'inherit', cwd })
}
