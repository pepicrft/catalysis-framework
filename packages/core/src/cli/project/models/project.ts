import type Configuration from '../../../shared/configuration'

/** The UI framework to use for a given route. */
export type UIFramework = 'react' | 'svelte' | 'vue'

export interface UIComponent {
  /** Path to the file that default exports the component representing the route. */
  file: string

  /** When true, the route is statically generated at deployment time
   *  and served statically.
   */
  static: boolean

  /**
   * The UI framework that should be used for a given route.
   */
  framework: UIFramework
}

export interface UIData {
  /** The path to the UI route .data.{ts} that exports a default function
   *  whose return data will be passed to the UI component.
   */
  file: string
}

export interface UIRoute {
  /** The route slug */
  slug: string

  /** The UI component that renders the route. */
  component: UIComponent

  /** The data source for the UI component. */
  data?: UIData
}

export interface DataRoute {
  file: string
}

export interface Route {
  ui?: UIRoute
}

/**
 * Interface that represents a Gestalt project.
 */
export default interface Project {
  /** Directory where the project lives */
  directory: string

  /** Project configuration */
  configuration: Configuration

  /** Project routes */
  routes: Route[]

  /** Application sources glob */
  sourcesGlob: string
}
