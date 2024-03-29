import { describe, test, expect, vi } from 'vitest'
import { checkStyle } from './style.js'
import type { LintOptions } from './style.js'
import { runESLint } from '@catalysisdev/core/node/eslint.js'
import { testProject } from '@catalysisdev/core/internal/node/testing/fixtures.js'

vi.mock('@catalysisdev/core/node/eslint')

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
      `${options.project.directory.pathString}`
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
      `${options.project.directory.pathString}`
    )
  })
})

function getOptions({ fix }: { fix: boolean }): LintOptions {
  return {
    fix,
    project: testProject(),
  }
}
