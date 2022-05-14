import { terminal } from '@gestaltjs/core/cli'

export type InitOptions = {
  name: string
}
export async function initPrompt(
  options: Partial<InitOptions>
): Promise<InitOptions> {
  type QuestiosType = Parameters<typeof terminal.prompt>[0]
  return { name: 'x' }
}
