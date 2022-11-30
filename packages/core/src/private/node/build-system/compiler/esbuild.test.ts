import { describe, beforeEach, test, expect, vi } from 'vitest'
import { ESBuildBaseCompiler } from './esbuild.js'
import { inTemporarydirectory } from '../../../../internal/node/testing/temporary'
import { build as esbuild } from 'esbuild'

vi.mock('esbuild')

// let subject: ESBuildBaseCompiler

// beforeEach(() => {
//   subject = new ESBuildBaseCompiler()
// })

describe('buildAndLoadModule', () => {
  test('it returns an Abort error when esbuild throws a non-Error instance', async () => {
    // await inTemporarydirectory(async (tmpDir) => {
    //   // Given
    //   const modulePath = tmpDir.pathAppendingComponent('module.ts')
    //   vi.mocked(esbuild).mockRejectedValue('error')
    //   // When/Then
    //   await expect(async () => {
    //     const result = await subject.buildAndLoadModule(modulePath)
    //     result.valueOrThrow()
    //   }).rejects.toThrowErrorMatchingInlineSnapshot(
    //     '"Unknown error building and loading a module with ESBuild: error"'
    //   )
    // })
  })
})
