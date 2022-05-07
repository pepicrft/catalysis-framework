import { UserRenderer } from './plugin/renderer'
import { UserAdapter } from './plugin/adapter'

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
   * A renderer integrates Gestalt with UI technologies like React or Svelte.
   */
  renderer?: UserRenderer

  /**
   * An adapter instructs Gestalt on how to build and output a Gestalt project for distribution.
   */
  adapter?: UserAdapter
}
