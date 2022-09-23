import { absolutePath } from '../node/path.js'
import { Project } from '../common/models.js'
import { ProjectImpl } from '../common/models/project.js'

/**
 * Creates and return a test project for testing purposes.
 * @param overrides {Partial<Project>} Object to override the default test values.
 * @returns A project instance.
 */
export function testProject(overrides: Partial<Project> = {}): Project {
  return new ProjectImpl({
    configuration: {
      manifestPath:
        overrides?.configuration?.manifestPath ??
        absolutePath('/project/gestalt.config.js'),
      name: overrides?.configuration?.name ?? 'Test',
    },
    directory: overrides?.directory ?? absolutePath('/test/project'),
  })
}
