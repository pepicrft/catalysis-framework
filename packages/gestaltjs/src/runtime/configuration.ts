import { Configuration } from '@gestaltjs/core/shared'

export { Configuration }

type ConfigurationExport =
  | Configuration
  | (() => Promise<Configuration>)
  | (() => Configuration)

/**
 * A utility function to define the configuration. Since the function has its argument and
 * return value typed, when using it from the configuration default module, editors will
 * offer a better editing experience with syntax highlighting, validation, documentation,
 * and auto-completion.
 *
 * Alternatively, Configurations can use the '@type' annotation:
 *   @type {import('gestaltjs/configuration').Configuration}
 *   const config = {...}
 *
 * @param configuration {Configuration | () => Promise<Configuration> | () => Configuration} Define a new configuration.
 * @returns A promise that resolves with the configuration.
 */
export function defineConfiguration(
  configuration: ConfigurationExport
): ConfigurationExport {
  return configuration
}
