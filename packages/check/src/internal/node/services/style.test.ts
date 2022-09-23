import { describe, test, expect, vi } from 'vitest'
import { checkStyle } from './style.js'
import type { LintOptions } from './style.js'
import { runESLint } from '@gestaltjs/core/node/eslint'
import { testProject } from '@gestaltjs/core/testing/fixtures'

vi.mock('@gestaltjs/core/node/eslint')

describe('run', () => {
  test('runs eslint cli command', async () => {
    // Given
    const options = getOptions({ fix: false })

    const expectedArgs = [options.project.sourcesGlob]

    // When
    await checkStyle(options)

    // Then
    expect(runESLint).toHaveBeenCalledWith(
      expectedArgs,
      `${options.project.directory}`
    )
  })

  test('runs eslint cli command with fix option', async () => {
    // Given
    const options = getOptions({ fix: true })
    const expectedArgs = ['--fix', options.project.sourcesGlob]

    // When
    await checkStyle(options)

    // Then
    expect(runESLint).toHaveBeenCalledWith(
      expectedArgs,
      `${options.project.directory}`
    )
  })
})

function getOptions({ fix }: { fix: boolean }): LintOptions {
  return {
    fix,
    project: testProject(),
  }
}
