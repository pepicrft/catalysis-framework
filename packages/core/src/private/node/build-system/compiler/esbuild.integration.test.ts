import { describe, beforeEach, test, expect } from 'vitest'
import { ESBuildBaseCompiler } from './esbuild.js'
import { inTemporarydirectory } from '../../../../internal/node/testing/temporary'
import { writeFile } from '../../../../public/node/fs.js'

let subject: ESBuildBaseCompiler

beforeEach(() => {
  subject = new ESBuildBaseCompiler()
})

describe('compile', () => {
  test('it compiles when the input module is valid', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const inputPath = tmpDir.pathAppendingComponent('input.ts')
      const outputPath = tmpDir.pathAppendingComponent('output.ts')

      await writeFile(inputPath, `export function foo(): string {}`)

      // When/Then
      await subject.compile(inputPath, outputPath)
    })
  })

  test('it throws when the input module is invalid', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const inputPath = tmpDir.pathAppendingComponent('input.ts')
      const outputPath = tmpDir.pathAppendingComponent('output.ts')

      await writeFile(inputPath, `export function foo( invalid {`)

      // When/Then
      await expect(async () => {
        await subject.compile(inputPath, outputPath)
      }).rejects.toThrowError()
    })
  })
})
