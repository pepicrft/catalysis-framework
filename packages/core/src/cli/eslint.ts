import { Abort } from '../shared/error'
import { exec } from './system'
import { findUp, dirname } from '../node/path.public'
import { fileURLToPath } from 'url'

export const ESLintNotFoundError = () => {
  return new Abort('Could not locate ESLint', {
    next: '',
  })
}

export async function run(args: string[], cwd: string) {
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const eslintPath = await findUp('node_modules/.bin/eslint', {
    cwd: __dirname,
  })
  if (!eslintPath) {
    throw ESLintNotFoundError()
  }
  await exec(eslintPath, args, { stdio: 'inherit', cwd })
}
