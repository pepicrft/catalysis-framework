import { environmentVariables } from '../common/constants.js'
export { getUsername } from './environment/username.js'
type Environment = 'production' | 'development'

/**
 * Returns the environment in which the app should run.
 * @param env {{[key: string]: string}} Object containing environment variables.
 * @returns The environment the app should run in.
 */
export function catalysis(env = process.env): Environment {
  if (env[environmentVariables.environment] === 'development') {
    return 'development'
  } else if (env[environmentVariables.environment] === 'production') {
    return 'production'
  } else {
    return 'development'
  }
}

/**
 * Given an environment variable, it returns true if its value represents a truthy value.
 * @param value The environment variable value or undefined if it's not defined.
 * @returns True if the variable represents a truthy value.
 */
function isTruthy(value: string | undefined): boolean {
  if (!value) {
    return false
  }
  return ['TRUE', 'true', 'YES', 'yes', '1'].includes(value)
}

/**
 * Returns true if the code is subject of a test run.
 * @param env {object} Environment variables of the current process.
 * @returns True if the code is the subject of a test run.
 */
export function isRunningTests(env = process.env): boolean {
  return isTruthy(env['VITEST'])
}
