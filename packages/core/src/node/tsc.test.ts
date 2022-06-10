import { describe, test, expect, vi } from 'vitest'
import { exec } from '../cli/system'
import { parentDirectory, moduleDirname } from '../node/path'
import { runTypescriptCompiler, TSCNotFoundError } from './tsc'
import { findPathUp } from '../node/fs'

vi.mock('../cli/system')
vi.mock('../node/path')
vi.mock('../node/fs')

describe('run', () => {
  test('runs tsc', async () => {
    // Given
    const tscPath = '/test/tsc'
    const dirnamePath = '/gestalt/tsc'
    vi.mocked(findPathUp).mockResolvedValue(tscPath)
    vi.mocked(moduleDirname).mockReturnValue(dirnamePath)
    const args = ['foo']
    const cwd = '/project'

    // When
    await runTypescriptCompiler(args, cwd)

    // Then
    expect(findPathUp).toHaveBeenCalledWith('node_modules/.bin/tsc', {
      fromDirectory: dirnamePath,
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
    await expect(runTypescriptCompiler(args, cwd)).rejects.toEqual(
      TSCNotFoundError()
    )
  })
})
