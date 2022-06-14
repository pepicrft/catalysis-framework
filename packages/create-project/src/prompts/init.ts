import { prompt } from '@gestaltjs/core/node/terminal'

export type InitOptions = {
  name: string
}
export async function initPrompt(
  options: Partial<InitOptions>
): Promise<InitOptions> {
  type QuestiosType = Parameters<typeof prompt>[0]
  return { name: 'x' }
}
