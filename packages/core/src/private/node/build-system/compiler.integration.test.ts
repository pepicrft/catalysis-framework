import { beforeEach, describe, expect, test } from 'vitest'
import {
  ESBuildCompiler,
  Compiler,
  ModuleCompilationError,
} from './compiler.js'
import { inTemporarydirectory, writeFile } from '../../../public/node/fs.js'

let subject: InstanceType<ReturnType<typeof Compiler>>

describe('ESBuildCompiler', () => {
  beforeEach(() => {
    subject = new ESBuildCompiler()
  })

  describe('buildAndImportModule', () => {
    test("it builds and loads the module when it's valid", async () => {
      await inTemporarydirectory(async (tmpDir) => {
        // Given
        const modulePath = tmpDir.pathAppendingComponent('input.js')
        const inputModule = `
        export function foo() { return "bar" }
        `
        writeFile(modulePath, inputModule)

        // When
        const got = await subject.buildAndImportModule(modulePath)

        // Then
        expect(got.value.foo()).toEqual('bar')
      })
    })

    test('it returns a ModuleCompilationError error when the module fails to compile', async () => {
      await inTemporarydirectory(async (tmpDir) => {
        // Given
        const modulePath = tmpDir.pathAppendingComponent('input.js')
        const inputModule = `
          export function invalid { return "bar" }
          `
        writeFile(modulePath, inputModule)

        // When
        const got = await subject.buildAndImportModule(modulePath)

        // Then
        expect(() => {
          got.valueOrThrow()
        }).toThrowError(ModuleCompilationError)
      })
    })
  })
})
