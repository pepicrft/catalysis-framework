import { beforeEach, describe, expect, test } from 'vitest'
import { ProjectImpl } from './project.js'
import { testProject } from '../../../testing/fixtures.js'

describe('ProjectImpl', () => {
  let project: ProjectImpl

  beforeEach(() => {
    project = testProject()
  })

  test('sourceDirectory returns the right directory', () => {
    // When
    const got = project.sourceDirectory

    // Then
    expect(got).toEqual(project.directory.appending('src'))
  })

  test('middlewaresDirectory returns the right directory', () => {
    // When
    const got = project.middlewaresDirectory

    // Then
    expect(got).toEqual(project.directory.appending('src/middlewares'))
  })
})
