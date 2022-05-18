export type PromptOptions = {
  name: string
}

export async function generateTargetPrompt(
  options: Partial<PromptOptions>
): Promise<PromptOptions> {
  return {
    name: 'something',
  }
}
