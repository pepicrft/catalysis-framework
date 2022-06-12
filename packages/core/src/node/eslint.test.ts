import { describe, test, expect, vi } from 'vitest'
import { exec } from '../cli/system'
import { parentDirectory } from '../node/path'
import { findPathUp } from '../node/fs'
import { runESLint, ESLintNotFoundError } from './eslint'

vi.mock('../cli/system')
vi.mock('../node/path')
vi.mock('../node/fs')

describe('runESLint', () => {
  test('runs eslint', async () => {
    // Given
    const eslintPath = '/test/eslint'
    const eslintTSDirectory = '/gestalt/eslint'
    vi.mocked(findPathUp).mockResolvedValue(eslintPath)
    vi.mocked(parentDirectory).mockReturnValue(eslintTSDirectory)
    const args = ['foo']
    const cwd = '/project'

    // When
    await runESLint(args, cwd)

    // Then
    expect(findPathUp).toHaveBeenCalledWith('node_modules/.bin/eslint', {
      fromDirectory: eslintTSDirectory,
    })
    expect(exec).toHaveBeenCalledWith(eslintPath, args, {
      stdio: 'inherit',
      cwd,
    })
  })

  test('aborts when ESLint cannot be found', async () => {
    // Given
    const eslintTSDirectory = '/gestalt/eslint'
    vi.mocked(findPathUp).mockResolvedValue(undefined)
    vi.mocked(parentDirectory).mockReturnValue(eslintTSDirectory)
    const args = ['foo']
    const cwd = '/project'

    // When
    await expect(runESLint(args, cwd)).rejects.toEqual(ESLintNotFoundError())
  })
})
