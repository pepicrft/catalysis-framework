import { describe, test, expect, vi } from 'vitest'
import { eslint, project } from '@gestaltjs/core/cli'
import { checkStyle } from './style'
import type { LintOptions } from './style'

vi.mock('@gestaltjs/core/cli')

describe('run', () => {
  test('runs eslint cli command', async () => {
    // Given
    const options = getOptions({ fix: false })

    const expectedArgs = [options.project.sourcesGlob]

    // When
    await checkStyle(options)

    // Then
    expect(eslint.run).toHaveBeenCalledWith(
      expectedArgs,
      options.project.directory
    )
  })

  test('runs eslint cli command with fix option', async () => {
    // Given
    const options = getOptions({ fix: true })
    const expectedArgs = ['--fix', options.project.sourcesGlob]

    // When
    await checkStyle(options)

    // Then
    expect(eslint.run).toHaveBeenCalledWith(
      expectedArgs,
      options.project.directory
    )
  })
})

function getOptions({ fix }: { fix: boolean }): LintOptions {
  return {
    fix,
    project: {
      directory: '/project',
      configuration: {
        name: 'project',
        manifestPath: '/project/gestalt.config.js',
      },
      sourcesGlob: '/project/src/**/*.{ts,js}',
      targetsGraph: new project.TargetsGraph({
        main: {},
        shared: {},
      }),
    },
  }
}
