import { Project } from '@gestaltjs/core/node/project'
import { UserMainTarget } from '@gestaltjs/core/common/target'

/**
 * Creates and return a test project for testing purposes.
 * @param overrides {Partial<Project>} Object to override the default test values.
 * @returns A project instance.
 */
export function testProject(overrides: Partial<Project> = {}): Project {
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
  overrides: Partial<UserMainTarget> = {}
): UserMainTarget {
  return {
    platforms: overrides.platforms ?? ['web'],
    databases: overrides.databases ?? [],
  }
}
