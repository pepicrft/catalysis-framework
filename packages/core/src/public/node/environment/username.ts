/**
 * This module branched off from the commit f4a47485fcdf3bafee221cf5e6d6180344020d08
 * from the MIT-licensed project https://github.com/sindresorhus/username/blob/main/index.js
 *
 * We vendor modules to mitigate "delete node_modules" for Catalysis users. Those are caused
 * by packages shipping breaking changes in minor version bumps, and becomes more frequent
 * the larger the dependency graph is.
 */
import process from 'node:process'
import os from 'node:os'
import { exec } from '../system.js'
import { Bug } from '../../common/error.js'

/**
 * It returns an error that represents that a we couldn't obtain the user
 * from the environment. It will most likely happen if we introduce a regression
 * in this module or there's a OS that we don't support.
 * @returns {Bug} A bug error.
 */
const UsernameNotFoundError = () => {
  return new Bug("We couldn't obtain the username from the environment")
}
/**
 * It gets the username from the environment.
 * @returns {Promise<string | undefined>} A promise that resolves with the user or undefined if it can't be obtained
 */
export async function getUsername(): Promise<string> {
  const environmentVariable = getEnvironmentVariable()
  if (environmentVariable) {
    return environmentVariable
  }

  const userInfoUsername = getUsernameFromOsUserInfo()
  if (userInfoUsername) {
    return userInfoUsername
  }

  /**
	First we try to get the ID of the user and then the actual username. We do this because in `docker run --user <uid>:<gid>` context, we don't have "username" available. Therefore, we have a fallback to `makeUsernameFromId` for such scenario. Applies also to the `sync()` method below.
	*/
  try {
    if (process.platform === 'win32') {
      const { stdout: stdoutBuffer } = await exec('whoami')
      const stdout = stdoutBuffer.toString()
      return cleanWindowsCommand(stdout)
    }

    const { stdout: userIdBuffer } = await exec('id', ['-u'])
    const userId = userIdBuffer.toString()
    try {
      const { stdout: stdoutBuffer } = await exec('id', ['-un', userId])
      return stdoutBuffer.toString()
      // eslint-disable-next-line no-empty
    } catch {}

    return makeUsernameFromId(userId)
    // eslint-disable-next-line no-empty
  } catch {}
  throw UsernameNotFoundError()
}

/**
 * It goes through a list of environment variables that OSs use
 * and returns the one that's present in the provided set of env.
 * variables.
 *
 * @param env {{[variable: string]: string}} Environment variables
 * @returns
 */
function getEnvironmentVariable(env = process.env) {
  return (
    env.SUDO_USER ||
    env.C9_USER || // Cloud9
    env.LOGNAME ||
    env.USER ||
    env.LNAME ||
    env.USERNAME
  )
}

/**
 * Returns the username from the object returned by Node's
 * os module.
 * @returns {string | undefined}
 */
function getUsernameFromOsUserInfo(): string | undefined {
  try {
    return os.userInfo().username
  } catch {
    return undefined
  }
}

function cleanWindowsCommand(value: string) {
  return value.replace(/^.*\\/, '')
}

function makeUsernameFromId(userId: string) {
  return `no-username-${userId}`
}
