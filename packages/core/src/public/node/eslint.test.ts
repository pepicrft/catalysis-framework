import { describe, test, expect, vi } from 'vitest'
import { exec } from './system.js'
import { absolutePath, moduleDirname, parentDirectory } from './path.js'
import { findPathUp } from './fs.js'
import { runESLint, ESLintNotFoundError } from './eslint.js'

vi.mock('./system.js')
vi.mock('./path.js')
vi.mock('./fs.js')

describe('runESLint', () => {
  test('runs eslint', async () => {
    // Given
    const eslintPath = '/test/eslint'
    const eslintTSDirectory = absolutePath('/catalysis/eslint')
    vi.mocked(findPathUp).mockResolvedValue(eslintPath)
    vi.mocked(moduleDirname).mockReturnValue(eslintTSDirectory)
    const args = ['foo']
    const cwd = '/project'

    // When
    await runESLint(args, cwd)

    // Then
    expect(findPathUp).toHaveBeenCalledWith('node_modules/.bin/eslint', {
      cwd: eslintTSDirectory,
    })
    expect(exec).toHaveBeenCalledWith(eslintPath, args, {
      stdio: 'inherit',
      cwd,
    })
  })

  test('aborts when ESLint cannot be found', async () => {
    // Given
    const eslintTSDirectory = '/catalysis/eslint'
    vi.mocked(findPathUp).mockResolvedValue(undefined)
    vi.mocked(parentDirectory).mockReturnValue(eslintTSDirectory)
    const args = ['foo']
    const cwd = '/project'

    // When
    await expect(runESLint(args, cwd)).rejects.toEqual(ESLintNotFoundError())
  })
})
