import { loadTargets } from './target'
import { lookupConfigurationPathTraversing, loadConfig } from './config'
import { getModuleLoader } from './module-loader'
import { describe, test, expect, vi } from 'vitest'
import { loadProject, ConfigFileNotFoundError } from './project'
import { testProject } from '@gestaltjs/testing/node/models'
import { joinPath } from '../../../node/path'
import { validateProject } from '../validate/project'

vi.mock('./config')
vi.mock('./module-loader')
vi.mock('./target')
vi.mock('../validate/project')

describe('loadProject', () => {
  test("throws an error when a configuration can't be found", async () => {
    // Given
    const fromDirectory = '/test/project'
    vi.mocked(lookupConfigurationPathTraversing).mockResolvedValue(undefined)

    // Then
    await expect(loadProject(fromDirectory)).rejects.toThrowError(
      ConfigFileNotFoundError()
    )
  })

  test('loads the project successfully if the project is valid', async () => {
    // Given
    const fromDirectory = '/test/project'
    const configurationManifestPath = '/test/project/gestalt.config.js'
    vi.mocked(lookupConfigurationPathTraversing).mockResolvedValue(
      configurationManifestPath
    )
    const close = vi.fn()
    const moduleLoader: any = { close }
    const project = testProject()
    vi.mocked(getModuleLoader).mockResolvedValue(moduleLoader)
    vi.mocked(loadConfig).mockResolvedValue(project.configuration)
    vi.mocked(loadTargets).mockResolvedValue(project.targets)

    // When
    const got = await loadProject(fromDirectory)

    // Then
    expect(close).toHaveBeenCalled()
    expect(got.configuration).toEqual(project.configuration)
    expect(got.directory).toEqual(fromDirectory)
    expect(got.targets).toEqual(project.targets)
    expect(validateProject).toHaveBeenCalledWith(got)
    expect(got.sourcesGlob).toEqual(joinPath(fromDirectory, 'src/**/*.{ts,js}'))
  })
})
