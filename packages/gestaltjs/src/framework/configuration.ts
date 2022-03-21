import { Configuration } from '@gestaltjs/core/shared'

/**
 * defineConfiguration is a function that takes a configuration and returns it.
 * Thanks to importing and using it IDEs are able to provide validation, auto-completion,
 * and inline documentation.
 * @param configuration {Configuration} The configuration object.
 * @returns The passed configuration.
 */
export async function defineConfiguration(
  configuration: Configuration
): Promise<Configuration> {
  return configuration
}
