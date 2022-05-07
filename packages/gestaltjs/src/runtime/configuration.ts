import { UserConfiguration } from '@gestaltjs/core/shared'
export { useContext } from '@gestaltjs/core/shared'

export { UserConfiguration }

type UserConfigurationExport =
  | UserConfiguration
  | (() => Promise<UserConfiguration>)
  | (() => UserConfiguration)

/**
 * A utility function to define the configuration. Since the function has its argument and
 * return value typed, when using it from the configuration default module, editors will
 * offer a better editing experience with syntax highlighting, validation, documentation,
 * and auto-completion.
 *
 * Alternatively, Configurations can use the '@type' annotation:
 *   @type {import('gestaltjs/configuration').UserConfiguration}
 *   const config = {...}
 *
 * @param configuration {UserConfiguration | () => Promise<UserConfiguration> | () => UserConfiguration} Define a new configuration.
 * @returns A promise that resolves with the configuration.
 */
export function defineConfiguration(
  configuration: UserConfigurationExport
): UserConfigurationExport {
  return configuration
}
