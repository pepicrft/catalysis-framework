// execa
import { execa } from 'execa'
import { encodeJSON } from '../common/json.js'
import { coreLogger } from './logger.js'

export type ExecOptions = Parameters<typeof execa>[1]

export async function exec(
  command: string,
  args?: string[],
  options?: ExecOptions
) {
  coreLogger().debug(`Running a system process:
  · Command: ${command} ${(args ?? []).join(' ')}
  · Options: ${encodeJSON(options ?? {})}`)
  return await execa(command, args, options)
}
