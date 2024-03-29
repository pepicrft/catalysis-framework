import { beforeEach, describe, expect, test } from 'vitest'
import { testProject } from '../../../../internal/node/testing/fixtures.js'
import { ProjectImpl } from './project.js'

describe('ProjectImpl', () => {
  let project: ProjectImpl

  beforeEach(() => {
    project = testProject()
  })

  test('sourceDirectory returns the right directory', () => {
    // When
    const got = project.sourceDirectory

    // Then
    expect(got).toEqual(project.directory.pathAppendingComponent('src'))
  })

  test('middlewaresDirectory returns the right directory', () => {
    // When
    const got = project.middlewaresDirectory

    // Then
    expect(got).toEqual(
      project.directory.pathAppendingComponent('src/middlewares')
    )
  })
})
