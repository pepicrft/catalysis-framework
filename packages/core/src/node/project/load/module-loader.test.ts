import { getModuleLoader } from './module-loader.js'
import { describe, test, expect } from 'vitest'
import { inTemporarydirectory } from '@gestaltjs/testing/node/temporary'
import { joinPath } from '../../../node/path.js'
import { writeFile } from '../../../node/fs.js'

describe('getModuleLoader', () => {
  test('load loads a module successfully', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const moduleContent = `
        const object = { name: "Test" };
        export default object;
        `
      const modulePath = joinPath(tmpDir, 'module.js')
      await writeFile(modulePath, moduleContent)
      const moduleLoader = await getModuleLoader(tmpDir)

      // When
      const got: any = await moduleLoader.load(modulePath)

      // Then
      await moduleLoader.close()
      expect(got.default.name).toEqual('Test')
    })
  })

  test('watch notifies when an existing module changes', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      type Module = { default: { name: string } }
      const firstModuleContent = `
        const object = { name: "First" };
        export default object;
        `
      const secondModuleContent = `
        const object = { name: "Second" };
        export default object;
        `
      const modulePath = joinPath(tmpDir, 'module.js')
      await writeFile(modulePath, firstModuleContent)
      const moduleLoader = await getModuleLoader(tmpDir)

      // When
      const got: Module = await moduleLoader.load(modulePath)

      // Then
      expect(got.default.name).toEqual('First')
      const updatedModule: Module = await new Promise((resolve) => {
        moduleLoader.watch(tmpDir, async (modulePath) => {
          resolve(await moduleLoader.load(modulePath))
        })
        writeFile(modulePath, secondModuleContent)
      })
      expect(updatedModule.default.name).toEqual('Second')
      await moduleLoader.close()
    })
  })
})
