import { describe, test, expect, vi } from 'vitest'
import { runTypescriptCompiler } from '@catalysisdev/core/node/tsc'
import { checkCode } from './code.js'
import { absolutePath } from '@catalysisdev/core/node/path'

vi.mock('@catalysisdev/core/node/tsc')
describe('run', () => {
  test('runs tsc cli command', async () => {
    // Given
    const appDirectory = absolutePath('/app')

    const expectedArgs = ['--noEmit']

    // When
    await checkCode(appDirectory)

    // Then
    expect(runTypescriptCompiler).toHaveBeenCalledWith(
      expectedArgs,
      `${appDirectory.pathString}`
    )
  })
})
