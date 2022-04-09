/**
 * A renderer integrates a UI technology (e.g. React, Vue, Svelte)
 * into Gestalt.
 */
export type Renderer = {
  dependencies: { [key: string]: string }
}
