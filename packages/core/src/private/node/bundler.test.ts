import { absolutePath, joinPath } from '../../public/node/path.js'
import { writeFile } from '../../public/node/fs.js'
import { describe, test } from 'vitest'
import { inTemporarydirectory } from '../../internal/node/testing/temporary.js'
import { createProjectBundler } from './bundler.js'

// import { joinPath } from '../../../public/node/path.js'
// import { writeFile } from '../../../public/node/fs.js'

describe('getModuleLoader', () => {
  test('load loads a module successfully', async () => {
    await inTemporarydirectory(async (tmpDir) => {
      // Given
      const configurationFileContent = `
import { defineConfiguration } from 'gestaltjs/configuration'

// eslint-disable-next-line import/no-default-export
export default defineConfiguration(() => ({
  name: 'test',
  plugins: [],
}))
`
      const configurationFilePath = tmpDir.appending('gestalt.config.js')
      await writeFile(configurationFilePath, configurationFileContent)
      const projectBundler = await createProjectBundler(tmpDir)

      // When
      // const got = await projectBundler.load()

      // // Given
      // const moduleContent = `
      //   const object = { name: "Test" };
      //   export default object;
      //   `
      // const modulePath = joinPath(tmpDir, 'module.js')
      // await writeFile(modulePath, moduleContent)
      // const projectBundler = await createProjectBundler(tmpDir)
      // // When
      // const got: any = await projectBundler.load(modulePath)
      // // Then
      // await projectBundler.close()
      // expect(got.default.name).toEqual('Test')
    })
  })
})

// import { lookupConfigurationPathTraversing, loadConfig } from './config.js'
// import { getProjectLoader } from '../../../../private/project-loader.js'
// import { describe, test, expect, vi } from 'vitest'
// import { loadProject, ConfigFileNotFoundError } from './project.js'
// import { validateProject } from '../validators/project.js'
// import { testProject } from '../../../testing/fixtures.js'
// import { absolutePath } from '../../path.js'

// vi.mock('./config')
// vi.mock('../../../../private/project-loader')
// vi.mock('../validate/project')

// describe('loadProject', () => {
//   test("throws an error when a configuration can't be found", async () => {
//     // Given
//     const fromDirectory = '/test/project'
//     vi.mocked(lookupConfigurationPathTraversing).mockResolvedValue(undefined)

//     // Then
//     await expect(loadProject(fromDirectory)).rejects.toThrowError(
//       ConfigFileNotFoundError()
//     )
//   })

//   test('loads the project successfully if the project is valid', async () => {
//     // Given
//     const fromDirectory = '/test/project'
//     const configurationManifestPath = '/test/project/gestalt.config.js'
//     vi.mocked(lookupConfigurationPathTraversing).mockResolvedValue(
//       configurationManifestPath
//     )
//     const close = vi.fn()
//     const moduleLoader: any = { close }
//     const project = testProject()
//     vi.mocked(getProjectLoader).mockResolvedValue(moduleLoader)
//     vi.mocked(loadConfig).mockResolvedValue(project.configuration)

//     // When
//     const got = await loadProject(fromDirectory)

//     // Then
//     expect(close).toHaveBeenCalled()
//     expect(got.configuration).toEqual(project.configuration)
//     expect(got.directory).toEqual(absolutePath(fromDirectory))
//     expect(validateProject).toHaveBeenCalledWith(got)
//   })
// })

// import { describe, test, expect, vi } from 'vitest'
// import { loadConfig, watchConfig } from './config.js'
// import { Configuration } from '../models/configuration.js'
// import { absolutePath } from '../../path.js'

// describe('loadConfig', () => {
//   test('loads the configuration through the module loader', async () => {
//     // Given
//     const moduleLoader = {
//       load: vi.fn(),
//     }
//     const manifestPath = '/test/gestalt.config.js'

//     const module: { default: Configuration } = {
//       default: {
//         name: 'Project',
//         path: absolutePath(manifestPath),
//       },
//     }
//     vi.mocked(moduleLoader.load).mockResolvedValue(module)

//     // When
//     const got = await loadConfig(manifestPath, moduleLoader as any)

//     // Then
//     expect(got.name).toEqual('Project')
//   })

//   test('watches the configuration through the module loader', async () => {
//     // Given
//     const watch = vi.fn()
//     const load = vi.fn()
//     const moduleLoader = {
//       watch,
//       load,
//     }
//     const manifestPath = '/test/gestalt.config.js'
//     const module: { default: Configuration } = {
//       default: {
//         name: 'Project',
//         path: absolutePath(manifestPath),
//       },
//     }
//     vi.mocked(moduleLoader.load).mockResolvedValue(module)

//     // When
//     let gotConfiguration: Configuration | undefined
//     await watchConfig(manifestPath, moduleLoader as any, (configuration) => {
//       gotConfiguration = configuration
//     })

//     // Then
//     const callback = watch.mock.calls[0][1]
//     await callback(manifestPath)
//     expect(gotConfiguration).toEqual(module.default)
//   })
// })
