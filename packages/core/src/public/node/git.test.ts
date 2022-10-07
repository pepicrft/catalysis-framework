import { absolutePath } from 'typed-file-system-path'
import { describe, expect, test, vi } from 'vitest'
import { initGitRepository } from './git.js'
import { exec } from './system.js'

vi.mock('./system.js')

describe('initGitRepository', async () => {
  test('invokes git with the right arguments', async () => {
    // Given
    const directory = absolutePath('/tmp/project')
    const branch = 'main'

    // When
    await initGitRepository({
      branch,
      directory,
    })

    // Then
    expect(exec).toHaveBeenCalledWith('git', ['init', '-b', branch], {
      cwd: directory.pathString,
    })
  })
})
