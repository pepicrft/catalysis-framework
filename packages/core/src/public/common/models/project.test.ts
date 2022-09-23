import { beforeEach, describe, expect, test } from 'vitest'
import { ProjectImpl } from './project.js'
import { AbsolutePath, absolutePath } from '../../node/path.js'

describe('ProjectImpl', () => {
  let projectDirectory: AbsolutePath
  let project: ProjectImpl

  beforeEach(() => {
    projectDirectory = absolutePath('/tmp/project')
    project = new ProjectImpl({
      configuration: {
        manifestPath: projectDirectory.appending('gestalt.config.js'),
        name: 'test',
        plugins: [],
      },
      directory: projectDirectory,
    })
  })

  test('sourceDirectory returns the right directory', () => {
    // When
    const got = project.sourceDirectory

    // Then
    expect(got).toEqual(projectDirectory.appending('src'))
  })

  test('middlewaresDirectory returns the right directory', () => {
    // When
    const got = project.middlewaresDirectory

    // Then
    expect(got).toEqual(projectDirectory.appending('src/middlewares'))
  })
})
