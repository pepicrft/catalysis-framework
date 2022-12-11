import { absolutePath } from 'typed-file-system-path'
import { describe, beforeEach, test, vi, expect } from 'vitest'
import { ESBuildBaseTranspiler } from './esbuild.js'
import { build as esbuild } from 'esbuild'

vi.mock('esbuild')

let subject: ESBuildBaseTranspiler

beforeEach(() => {
  subject = new ESBuildBaseTranspiler()
})

describe('esbuild', () => {
  test('it invokes esbuild with the right arguments', async () => {
    // Given
    const inputPath = absolutePath('/input.js')
    const outputPath = absolutePath('/output.js')

    // When
    await subject.transpile(inputPath, outputPath)

    // Then
    expect(esbuild).toHaveBeenCalledWith({
      entryPoints: [inputPath.pathString],
      bundle: false,
      outfile: outputPath.pathString,
      logLevel: 'silent',
    })
  })
})
