import { beforeEach, describe, expect, test } from 'vitest'
import {
  ESBuildTranspiler,
  Transpiler,
  ModuleTranspilationError,
} from './transpiler.js'
import { inTemporarydirectory, writeFile } from '../../../public/node/fs.js'

let subject: InstanceType<ReturnType<typeof Transpiler>>

describe('ESBuildTranspiler', () => {
  beforeEach(() => {
    subject = new ESBuildTranspiler()
  })

  describe('buildAndImportModule', () => {
    test("it builds and loads the module when it's valid", async () => {
      await inTemporarydirectory(async (tmpDir) => {
        // Given
        const modulePath = tmpDir.pathAppendingComponent('input.js')
        const inputModule = `
        export function foo() { return "bar" }
        `
        await writeFile(modulePath, inputModule)

        // When
        const got = await subject.buildAndImportModule(modulePath)

        // Then
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        expect(got.value.foo()).toEqual('bar')
      })
    })

    test('it returns a ModuleTranspilationError error when the module fails to compile', async () => {
      await inTemporarydirectory(async (tmpDir) => {
        // Given
        const modulePath = tmpDir.pathAppendingComponent('input.js')
        const inputModule = `
          export functon invalid { retn bar" }
          `
        await writeFile(modulePath, inputModule)

        // When/Then
        await expect(async () => {
          ;(await subject.buildAndImportModule(modulePath)).valueOrThrow()
        }).rejects.toThrowError(ModuleTranspilationError)
      })
    })
  })
})
