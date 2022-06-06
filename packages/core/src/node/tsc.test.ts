import { describe, test, expect, vi } from 'vitest'
import { exec } from './system'
import { findPathUp, parentDirectory } from '../node/path'
import { run, TSCNotFoundError } from './tsc'

vi.mock('./system')
vi.mock('../node/path')

describe('run', () => {
  test('runs tsc', async () => {
    // Given
    const tscPath = '/test/tsc'
    const dirnamePath = '/gestalt/tsc'
    vi.mocked(findPathUp).mockResolvedValue(tscPath)
    vi.mocked(parentDirectory).mockReturnValue(dirnamePath)
    const args = ['foo']
    const cwd = '/project'

    // When
    await run(args, cwd)

    // Then
    expect(findPathUp).toHaveBeenCalledWith('node_modules/.bin/tsc', {
      cwd: dirnamePath,
    })
    expect(exec).toHaveBeenCalledWith(tscPath, args, { stdio: 'inherit', cwd })
  })

  test('aborts when typescript compiler cannot be found', async () => {
    // Given
    const eslintTSDirectory = '/gestalt/tsc'
    vi.mocked(findPathUp).mockResolvedValue(undefined)
    vi.mocked(parentDirectory).mockReturnValue(eslintTSDirectory)
    const args = ['foo']
    const cwd = '/project'

    // When
    await expect(run(args, cwd)).rejects.toEqual(TSCNotFoundError())
  })
})
