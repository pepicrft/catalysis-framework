// execa
import { execa } from 'execa'
import { encodeJSON } from '../common/json.js'

export type ExecOptions = Parameters<typeof execa>[1]

export async function exec(
  command: string,
  args?: string[],
  options?: ExecOptions
) {
  return await execa(command, args, options)
}
