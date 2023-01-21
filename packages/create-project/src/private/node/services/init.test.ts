import { absolutePath } from '@catalysisdev/core/node/path.js'
import { unstyled } from '@catalysisdev/core/node/terminal.js'
import { test, describe, expect } from 'vitest'
import { ProjectDirectoryExistsError } from './init.js'

describe('ProjectDirectoryExistsError', () => {
  test('has the right message', () => {
    // Given
    const error = ProjectDirectoryExistsError(absolutePath('/test/project'))

    // Then
    expect(unstyled(error.message)).toMatchInlineSnapshot(
      '"The directory /test/project already exists."'
    )
  })
})
