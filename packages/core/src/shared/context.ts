/**
 * The context is used to expose information to manifest files at loading time.
 * For example, plugins can change their setting depending on whether the project
 * is running in development or production.
 */
export type Context = {
  /** The environment used for running the project */
  environment: 'development' | 'production'
}

/**
 * Sets the context. This method should be called before loading the project.
 * @param context {Context} Sets a context before loading the project to be able to expose the conte
 */
export function setContext(context: Context) {
  process.env.GESTALT_CONTEXT = JSON.stringify(context)
}

/**
 * Returns the context of the current process.
 * @returns {Context} The shared context.
 */
export function useContext(): Context {
  const envVariable = process.env.GESTALT_CONTEXT
  if (envVariable) {
    return JSON.parse(envVariable)
  } else {
    return { environment: 'development' }
  }
}
