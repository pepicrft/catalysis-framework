import { configuration } from '@gestaltjs/core/shared'
export { useContext } from '@gestaltjs/core/shared'

type ConfigurationExport =
  | configuration.Configuration
  | (() => Promise<configuration.Configuration>)
  | (() => configuration.Configuration)

/**
 * A utility function to define the configuration. Since the function has its argument and
 * return value typed, when using it from the configuration default module, editors will
 * offer a better editing experience with syntax highlighting, validation, documentation,
 * and auto-completion.
 *
 * Alternatively, Configurations can use the '@type' annotation:
 *   @type {import('gestaltjs/configuration').configuration.Configuration}
 *   const config = {...}
 *
 * @param configuration {configuration.Configuration | () => Promise<configuration.Configuration> | () => configuration.Configuration} Define a new configuration.
 * @returns A promise that resolves with the configuration.
 */
export function defineConfiguration(
  configuration: ConfigurationExport
): ConfigurationExport {
  return configuration
}
