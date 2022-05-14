// execa
import { execa } from 'execa'

export type ExecOptions = Parameters<typeof execa>[1]

export async function exec(
  command: string,
  args?: string[],
  options?: ExecOptions
): Promise<void> {
  await execa(command, args, options)
}
