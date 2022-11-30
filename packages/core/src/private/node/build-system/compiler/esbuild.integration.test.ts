import { describe, beforeEach, test, expect } from 'vitest'
import { ESBuildBaseCompiler } from './esbuild.js'
import { inTemporarydirectory } from '../../../../internal/node/testing/temporary'
import { writeFile } from '../../../../public/node/fs.js'
import { ModuleCompilationError } from '../compiler.js'

// let subject: ESBuildBaseCompiler

// beforeEach(() => {
//   subject = new ESBuildBaseCompiler()
// })

describe('buildAndLoadModule', () => {
  test('it returns a ModuleCompilationError error if the build fails', async () => {
    // await inTemporarydirectory(async (tmpDir) => {
    //   // Given
    //   const modulePath = tmpDir.pathAppendingComponent('module.ts')
    //   await writeFile(
    //     modulePath,
    //     `export function foo( invalid { return "bar" }`
    //   )
    //   // When
    //   const got = (await subject.buildAndLoadModule(modulePath)).error
    //   // Then
    //   expect(got).toBeInstanceOf(ModuleCompilationError)
    // })
  })

  test("it loads the module when it's valid", async () => {
    // await inTemporarydirectory(async (tmpDir) => {
    //   // Given
    //   const modulePath = tmpDir.pathAppendingComponent('module.ts')
    //   await writeFile(
    //     modulePath,
    //     `
    // export function foo(): string {
    //     return "bar"
    // }
    // `
    //   )
    //   // When
    //   const got = (await subject.buildAndLoadModule(modulePath)).value
    //   // Then
    //   expect(got.foo()).toEqual('bar')
    // })
  })
})
