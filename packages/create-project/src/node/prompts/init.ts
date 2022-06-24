import {} from '@gestaltjs/core/node/terminal'

export type InitOptions = {
  name: string
}
export async function initPrompt(
  options: Partial<InitOptions>
): Promise<InitOptions> {
  return { name: 'x' }
}
