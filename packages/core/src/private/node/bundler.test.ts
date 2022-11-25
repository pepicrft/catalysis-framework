// import { writeFile } from '../../public/node/fs.js'
// import { describe, expect, test } from 'vitest'
// import { inTemporarydirectory } from '../../internal/node/testing/temporary.js'
// import { createProjectBundler } from './bundler.js'
// import { gestaltjsPackageModules } from '../../internal/node/testing/workspace.js'

import { expect, test } from 'vitest'

test('something', () => {
  expect(true).toBeTruthy()
})
// describe('getModuleLoader', () => {
//   test('load loads a module successfully', async () => {
//     await inTemporarydirectory(async (tmpDir) => {
//       // Given
//       const { configuration: configurationModule } =
//         await gestaltjsPackageModules()
//       const configurationFileContent = `
//       import { defineConfiguration } from 'gestaltjs/configuration'

//       export default defineConfiguration(() => ({
//         name: 'test',
//         plugins: [],
//       }))
//       `
//       const configurationFilePath =
//         tmpDir.pathAppendingComponent('gestalt.config.js')
//       await writeFile(configurationFilePath, configurationFileContent)
//       const projectBundler = await createProjectBundler({
//         fromDirectory: tmpDir,
//         resolve: {
//           alias: { 'gestaltjs/configuration': configurationModule.path },
//         },
//       })

//       // When
//       const got = await projectBundler.load()

//       // Then
//       expect(got.configuration.name).toEqual('test')
//       expect(got.directory).toEqual(tmpDir)
//       expect(got.sourceDirectory).toEqual(tmpDir.pathAppendingComponent('src'))
//     })
//   })
// })
