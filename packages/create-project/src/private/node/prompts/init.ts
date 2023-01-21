import { prompt } from '@catalysisdev/core/node/terminal.js'

/**
 * An interface that represents the flags that have been passed
 * by the user when invoking the init command.
 */
export type InitPromptFlags = {
  /** The name of the project */
  name: string
}

/**
 * Prompts for the flags that have not been passed.
 * @param flags {Partial<InitPromptFlags>} Flags passed to the user when invoking the command
 * @returns {InitPromptFlags} An object with all the flags as non-optional
 */
export async function initPrompt(
  flags: Partial<InitPromptFlags>
): Promise<InitPromptFlags> {
  return prompt(
    {
      name: {
        type: 'input',
        message: 'How would you like to name the project?',
      },
    },
    flags
  )
}
