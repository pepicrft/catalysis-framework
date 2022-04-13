// execa
import { execa } from 'execa'
export type ExecOptions = {
  cwd?: string
  stdio?: 'inherit'
}

export async function exec(
  command: string,
  args?: string[],
  options?: ExecOptions
): Promise<void> {
  await execa(command, args, options)
}
