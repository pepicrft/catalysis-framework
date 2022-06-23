import { UserWebTarget } from '@gestaltjs/core/common/manifests'
import { Project } from '@gestaltjs/core/common/models'

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
    targets: overrides?.targets ?? {},
  }
}

export function testWebTarget(
  overrides: Partial<UserWebTarget> = {}
): UserWebTarget {
  return {}
}
