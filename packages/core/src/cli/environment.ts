import constants from './constants'

type Environment = 'production' | 'development'

/**
 * Returns the environment in which the app should run.
 * @param env {{[key: string]: string}} Object containing environment variables.
 * @returns The environment the app should run in.
 */
export function gestalt(env = process.env): Environment {
  if (env[constants.environmentVariables.environment] === 'development') {
    return 'development'
  } else if (env[constants.environmentVariables.environment] === 'production') {
    return 'production'
  } else {
    return 'development'
  }
}
