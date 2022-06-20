import { project } from '@gestaltjs/core/cli'
import { MainTarget } from '@gestaltjs/core/common/target'

/**
 * Creates and return a test project for testing purposes.
 * @param overrides {Partial<project.Project>} Object to override the default test values.
 * @returns A project instance.
 */
export function testProject(
  overrides: Partial<project.models.Project> = {}
): project.models.Project {
  return {
    configuration: {
      manifestPath:
        overrides?.configuration?.manifestPath ?? 'gestalt.config.js',
      name: overrides?.configuration?.name ?? 'Test',
    },
    directory: overrides?.directory ?? '/test/project',
    sourcesGlob: overrides?.sourcesGlob ?? 'targets/**/*.ts',
    targets: overrides?.targets ?? {
      main: {},
    },
  }
}

export function testMainTarget(
  overrides: Partial<MainTarget> = {}
): MainTarget {
  return {
    platforms: overrides.platforms ?? ['web'],
    databases: overrides.databases ?? [],
  }
}
