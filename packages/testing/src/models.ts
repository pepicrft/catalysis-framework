import { project } from '@gestaltjs/core/cli'
import { UserMainTarget } from '@gestaltjs/core/shared'

/**
 * Creates and return a test project for testing purposes.
 * @param overrides {Partial<project.Project>} Object to override the default test values.
 * @returns A project instance.
 */
export function testProject(
  overrides: Partial<project.Project> = {}
): project.Project {
  return {
    configuration: {
      manifestPath:
        overrides?.configuration?.manifestPath ?? 'gestalt.config.js',
      name: overrides?.configuration?.name ?? 'Test',
    },
    directory: overrides?.directory ?? '/test/project',
    sourcesGlob: overrides?.sourcesGlob ?? 'targets/**/*.ts',
    targetsGraph:
      overrides?.targetsGraph ??
      new project.TargetsGraph({
        main: {},
        shared: {},
      }),
  }
}

export function testMainTarget(
  overrides: Partial<UserMainTarget> = {}
): UserMainTarget {
  return {
    platforms: overrides.platforms ?? ['web'],
  }
}
