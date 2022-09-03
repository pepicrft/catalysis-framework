import { decodeJson, encodeJson } from '../node/json.js'

/**
 * The context is used to expose information to manifest files at loading time.
 * For example, plugins can change their setting depending on whether the project
 * is running in development or production.
 *
 * Because manifest files are loaded through Vite's virtual module graph, they don't
 * have access to Gestalt's module graph, and therefore we can't share the context via
 * an in-memory variable. To workaround that, we use the process.env global variable.
 */
export type Context = {
  /** The environment used for running the project */
  environment: 'development' | 'production'
}

/**
 * Sets the context. This method should be called before loading the project.
 * @param context {Context} Sets a context before loading the project to be able to expose the context.
 * @param env {NodeJS.ProcessEnv} The Node environment to set the context.
 */
export function setContext(context: Context, env = process.env) {
  env.GESTALT_INTERNAL_CONTEXT = encodeJson(context)
}

/**
 * An internal version of useContext for testing purposes.
 * This removes the need for mocking the global process variable.
 */
export function _useContext(env = process.env): Context {
  const envVariable = env.GESTALT_INTERNAL_CONTEXT
  if (envVariable) {
    return decodeJson(envVariable)
  } else {
    return { environment: 'development' }
  }
}

/**
 * Returns the context of the current process.
 * @returns {Context} The shared context.
 */
export function useContext(): Context {
  return _useContext(process.env)
}
