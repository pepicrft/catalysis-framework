// execa
import { execa } from 'execa'
import { encodeJson } from './json.js'
import { coreLogger } from './logger.js'

export type ExecOptions = Parameters<typeof execa>[1]

export async function exec(
  command: string,
  args?: string[],
  options?: ExecOptions
) {
  coreLogger().debug(`Running a system process:
  · Command: ${command} ${(args ?? []).join(' ')}
  · Options: ${encodeJson(options ?? {})}`)
  return await execa(command, args, options)
}
