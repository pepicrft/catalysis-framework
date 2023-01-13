import { describe, test, expect, vi } from 'vitest'
import { exec } from './system.js'
import { parentDirectory, moduleDirname } from '../node/path.js'
import { runTypescriptCompiler, TSCNotFoundError } from './tsc.js'
import { findPathUp } from './fs'

vi.mock('./system.js')
vi.mock('./path.js')
vi.mock('./fs.js')

describe('run', () => {
  test('runs tsc', async () => {
    // Given
    const tscPath = '/test/tsc'
    const dirnamePath = '/catalysis/tsc'
    vi.mocked(findPathUp).mockResolvedValue(tscPath)
    vi.mocked(moduleDirname).mockReturnValue(dirnamePath)
    const args = ['foo']
    const cwd = '/project'

    // When
    await runTypescriptCompiler(args, cwd)

    // Then
    expect(findPathUp).toHaveBeenCalledWith('node_modules/.bin/tsc', {
      cwd: dirnamePath,
    })
    expect(exec).toHaveBeenCalledWith(tscPath, args, { stdio: 'inherit', cwd })
  })

  test('aborts when typescript compiler cannot be found', async () => {
    // Given
    const eslintTSDirectory = '/catalysis/tsc'
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
