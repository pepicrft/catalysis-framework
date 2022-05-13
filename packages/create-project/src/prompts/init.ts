import { terminal } from '@gestaltjs/core/cli'

export type InitOptions = {
  name: string
}
export async function initPrompt(options: Partial<InitOptions>): InitOptions {
  type QuestiosType = Parameters<typeof terminal.prompt>[0]
}
