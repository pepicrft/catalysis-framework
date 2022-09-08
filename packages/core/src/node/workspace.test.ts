import { describe, expect, test } from 'vitest'
import { unstyled } from './terminal.js'
import {
  GestaltDirectoryNotFoundError,
  gestaltjsPackageDirectory,
} from './workspace.js'

describe('GestaltDirectoryNotFoundError', () => {
  test('has the right message', () => {
    // Given/When
    const got = GestaltDirectoryNotFoundError().message

    // Then
    expect(unstyled(got)).toMatchInlineSnapshot(
      "\"Couldn't find the directory of the 'gestalt' package\""
    )
  })
})

describe('gestaltjsPackageDirectory', () => {
  test('it finds the directory', async () => {
    // Given/When
    const got = await gestaltjsPackageDirectory()

    // Then
    expect(got).not.toBeUndefined()
  })
})
