import { Abort } from '../shared/error'
import { exec } from './system'
import { findPathUp, parentDirectory } from '../node/path'
import { fileURLToPath } from 'url'

export const TSCNotFoundError = () => {
  return new Abort('Could not locate typescript compiler', { next: '' })
}

export async function run(args: string[], cwd: string) {
  const __dirname = parentDirectory(fileURLToPath(import.meta.url))
  const tscPath = await findPathUp('node_modules/.bin/tsc', { cwd: __dirname })
  if (!tscPath) {
    throw TSCNotFoundError()
  }

  await exec(tscPath, args, { stdio: 'inherit', cwd })
}
