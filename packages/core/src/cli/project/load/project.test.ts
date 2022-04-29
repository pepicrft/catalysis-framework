import { Project } from '../models/project'
import { loadTargetsGraph } from './target'
import { lookupConfigurationPathTraversing, loadConfig } from './config'
import { getModuleLoader } from './module-loader'
import { describe, test, expect, vi } from 'vitest'
import { loadProject, ConfigFileNotFoundError } from './project'
import { models } from '@gestaltjs/testing'
import { join as pathJoin } from '../../path'

vi.mock('./config')
vi.mock('./module-loader')
vi.mock('./target')

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
    const moduleLoader: any = {}
    const project = models.testProject()
    vi.mocked(getModuleLoader).mockResolvedValue(moduleLoader)
    vi.mocked(loadConfig).mockResolvedValue(project.configuration)
    vi.mocked(loadTargetsGraph).mockResolvedValue(project.targetsGraph)

    // When
    const got = await loadProject(fromDirectory)

    // Then
    expect(got.configuration).toEqual(project.configuration)
    expect(got.directory).toEqual(fromDirectory)
    expect(got.targetsGraph).toEqual(project.targetsGraph)
    expect(got.sourcesGlob).toEqual(pathJoin(fromDirectory, 'src/**/*.{ts,js}'))
  })
})
