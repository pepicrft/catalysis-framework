import { Bug } from '../shared/error'
import { exec } from './system'
import { findPathUp } from './fs'
import { moduleDirname } from './path'
/**
 * A function that returns an error to raise when the eslint executable
 * can't be located. This would happen if the dependency is deleted by
 * mistake.
 * @returns {Bug} A bug error
 */
export const ESLintNotFoundError = () => {
  return new Bug('Could not locate ESLint')
}

/**
 * Runs eslint with some arguments from the given working directory.
 * @param args {string[]} Arguments to pass to the eslint executable.
 * @param cwd {string} Working directory from which run eslint.
 */
export async function runESLint(args: string[], cwd: string) {
  const __dirname = moduleDirname(import.meta.url)
  const eslintPath = await findPathUp('node_modules/.bin/eslint', {
    fromDirectory: __dirname,
  })
  if (!eslintPath) {
    throw ESLintNotFoundError()
  }
  await exec(eslintPath, args, { stdio: 'inherit', cwd })
}
