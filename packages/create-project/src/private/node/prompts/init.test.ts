import { describe, expect, test, vi } from 'vitest'
import { initPrompt, InitPromptFlags } from './init.js'
import { prompt } from '@catalysisdev/core/node/terminal.js'

vi.mock('@catalysisdev/core/node/terminal')

describe('initPrompt', () => {
  test('delegates the prompting to prompt', async () => {
    // Given
    const flags: Partial<InitPromptFlags> = {}

    // When
    await initPrompt(flags)

    // Then
    expect(prompt).toHaveBeenCalledWith(
      {
        name: {
          type: 'input',
          message: 'How would you like to name the project?',
        },
      },
      {}
    )
  })
})
