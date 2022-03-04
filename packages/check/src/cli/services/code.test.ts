import { describe, it, expect, vi } from 'vitest'
import { tsc } from '@gestaltjs/core/cli'
import code from './code'
vi.mock('@gestaltjs/core/cli')
describe('run', () => {
  it('runs tsc cli command', async () => {
    // Given
    const appDirectory = '/app'

    const expectedArgs = ['--noEmit']

    // When
    await code(appDirectory)

    // Then
    expect(tsc.run).toHaveBeenCalledWith(expectedArgs, appDirectory)
  })
})
