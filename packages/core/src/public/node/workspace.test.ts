import { describe, expect, test } from 'vitest'
import { unstyled } from './terminal.js'
import {
  CatalysisDirectoryNotFoundError,
  catalysisdevPackageDirectory,
} from './workspace.js'

describe('CatalysisDirectoryNotFoundError', () => {
  test('has the right message', () => {
    // Given/When
    const got = CatalysisDirectoryNotFoundError().message

    // Then
    expect(unstyled(got)).toMatchInlineSnapshot(
      "\"Couldn't find the directory of the 'catalysis' package\""
    )
  })
})

describe('catalysisdevPackageDirectory', () => {
  test('it finds the directory', async () => {
    // Given/When
    const got = await catalysisdevPackageDirectory()

    // Then
    expect(got).not.toBeUndefined()
  })
})
