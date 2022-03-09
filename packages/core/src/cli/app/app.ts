import type { Configuration } from './configuration'

type RenderingType = 'client' | 'server' | 'static'
type UIFramework = 'react' | 'vue' | 'svelte'

type SlugType = 'dynamic' | 'static'
interface SlugComponent {
  type: SlugType
  value: string
}

/**
 * Interface that represents a Gestalt application.
 */
export default interface App {
  /** Directory where the app lives */
  directory: string

  /** App configuration */
  configuration: Configuration
}
