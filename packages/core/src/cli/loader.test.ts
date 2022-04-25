import { load } from './loader'
import { loadProject } from './project/load/project'
import { loadPlugins } from './plugin/load/plugin'
import { describe, expect, test, vi } from 'vitest'
import { Project } from './project/models/project'
import { TargetsGraph } from './project/models/target'
import { join as pathJoin } from './path'
import { configurationFileName } from './constants'
import { Plugin } from './plugin/models/plugin'

vi.mock('./project/load/project')
vi.mock('./plugin/load/plugin')

describe('load', () => {
  test('loads the project and its plugins', async () => {
    // Given
    const projectDirectory = '/test'
    const fromDirectory = '/test/directory'
    const project: Project = {
      directory: projectDirectory,
      configuration: {
        manifestPath: pathJoin(fromDirectory, `${configurationFileName}.js`),
        name: 'TestProject',
      },
      sourcesGlob: 'src/**/',
      targetsGraph: new TargetsGraph({
        main: {},
        shared: {},
      }),
    }
    const plugin: Plugin = {
      name: 'react',
      directory: '/test/react-plugin',
    }
    vi.mocked(loadProject).mockResolvedValue(project)
    vi.mocked(loadPlugins).mockResolvedValue([plugin])

    // When
    const got = await load(fromDirectory)

    // Then
    expect(loadPlugins).toHaveBeenCalledWith([project.directory])
    expect(got.project).toEqual(project)
    expect(got.plugins).toEqual([plugin])
  })
})
