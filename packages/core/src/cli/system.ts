export type ExecOptions = {
  cwd?: string
  silent?: boolean
}

export async function exec(
  command: string,
  options?: ExecOptions
): Promise<void> {}
