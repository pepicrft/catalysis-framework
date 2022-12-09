import { describe, test, expect, vi } from 'vitest'
import { runTypescriptCompiler } from '@gestaltjs/core/node/tsc'
import { checkCode } from './code.js'
import { absolutePath } from '@gestaltjs/core/node/path'

vi.mock('@gestaltjs/core/node/tsc')
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
