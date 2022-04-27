import { describe, test, expect, vi } from 'vitest'
import { exec } from './system'
import { findUp, dirname } from './path'
import { run, TSCNotFoundError } from './tsc'

vi.mock('./system')
vi.mock('./path')

describe('run', () => {
  test('runs tsc', async () => {
    // Given
    const tscPath = '/test/tsc'
    const dirnamePath = '/gestalt/tsc'
    vi.mocked(findUp).mockResolvedValue(tscPath)
    vi.mocked(dirname).mockReturnValue(dirnamePath)
    const args = ['foo']
    const cwd = '/project'

    // When
    await run(args, cwd)

    // Then
    expect(findUp).toHaveBeenCalledWith('node_modules/.bin/tsc', {
      cwd: dirnamePath,
    })
    expect(exec).toHaveBeenCalledWith(tscPath, args, { stdio: 'inherit', cwd })
  })

  test('aborts when typescript compiler cannot be found', async () => {
    // Given
    const eslintTSDirectory = '/gestalt/tsc'
    vi.mocked(findUp).mockResolvedValue(undefined)
    vi.mocked(dirname).mockReturnValue(eslintTSDirectory)
    const args = ['foo']
    const cwd = '/project'

    // When
    await expect(run(args, cwd)).rejects.toEqual(TSCNotFoundError())
  })
})
