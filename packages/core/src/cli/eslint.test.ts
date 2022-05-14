import { describe, test, expect, vi } from 'vitest'
import { exec } from './system'
import { findUp, dirname } from '../shared/path'
import { run, ESLintNotFoundError } from './eslint'

vi.mock('./system')
vi.mock('../shared/path')

describe('run', () => {
  test('runs eslint', async () => {
    // Given
    const eslintPath = '/test/eslint'
    const eslintTSDirectory = '/gestalt/eslint'
    vi.mocked(findUp).mockResolvedValue(eslintPath)
    vi.mocked(dirname).mockReturnValue(eslintTSDirectory)
    const args = ['foo']
    const cwd = '/project'

    // When
    await run(args, cwd)

    // Then
    expect(findUp).toHaveBeenCalledWith('node_modules/.bin/eslint', {
      cwd: eslintTSDirectory,
    })
    expect(exec).toHaveBeenCalledWith(eslintPath, args, {
      stdio: 'inherit',
      cwd,
    })
  })

  test('aborts when ESLint cannot be found', async () => {
    // Given
    const eslintTSDirectory = '/gestalt/eslint'
    vi.mocked(findUp).mockResolvedValue(undefined)
    vi.mocked(dirname).mockReturnValue(eslintTSDirectory)
    const args = ['foo']
    const cwd = '/project'

    // When
    await expect(run(args, cwd)).rejects.toEqual(ESLintNotFoundError())
  })
})
