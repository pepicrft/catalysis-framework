import { Bug } from './error'
import { exec } from './system'
import { findUp, dirname } from './path'
import { fileURLToPath } from 'url'

export const VitestNotFoundErrror = () => {
  return new Bug('Could not locate Vitest executable', {})
}

export async function run(args: string[], cwd: string) {
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const vitestPath = await findUp('node_modules/.bin/vitest', {
    cwd: __dirname,
  })
  if (!vitestPath) {
    throw VitestNotFoundErrror()
  }

  await exec(vitestPath, args, { stdio: 'inherit', cwd })
}
