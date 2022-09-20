import type { UserAdapter } from '../../node/plugin/adapter'

/**
 * The interface represents a Gestalt plugin. Plugins extend, augment, or replace Gestalt's
 * functionality, and also add new functionality.
 */
export type UserPlugin = {
  // The plugin name.
  name: string

  // The plugin description.
  description: string

  /**
   * An adapter instructs Gestalt on how to build and output a Gestalt project for distribution.
   */
  adapter?: UserAdapter
}
