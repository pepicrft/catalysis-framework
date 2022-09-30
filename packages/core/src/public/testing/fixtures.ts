import { ConfigurationImpl } from '../../private/node/project/models/configuration.js'
import { ProjectImpl } from '../../private/node/project/models/project.js'
import { absolutePath } from '../node/path.js'
import { Project } from '../node/project/project.js'

/**
 * Creates and return a test project for testing purposes.
 * @param overrides {Partial<Project>} Object to override the default test values.
 * @returns A project instance.
 */
export function testProject(overrides: Partial<Project> = {}): Project {
  return new ProjectImpl({
    configuration:
      overrides?.configuration ??
      new ConfigurationImpl({
        path:
          overrides?.configuration?.path ??
          absolutePath('/project/gestalt.config.js'),
        userConfiguration: {
          name: overrides?.configuration?.name ?? 'Test',
        },
      }),
    directory: overrides?.directory ?? absolutePath('/test/project'),
  })
}
