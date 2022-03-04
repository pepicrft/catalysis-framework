import { core as coreLogger } from './logger'
import type { ErrorLog, ErrorLogType } from './logger'
import { formatBold, formatRed } from './terminal'

type ErrorOptions = {
  /**
   * The cause of the error.
   * Note that in some scenarios, the developer raising
   * a bug might not have enough information to include
   * a cause. In that case, the error is raised without
   * a cause with the aim of iterating on it once we have
   * additional context from the bug report.
   */
  cause?: string
}
/**
 * It defines the interface of the options
 * object a bug error is initialized with.
 */
type BugOptions = ErrorOptions

/**
 * A bug error is an error that represents that represents
 * a bug and should be tracked for fixing.
 */
export class Bug extends Error {
  /**
   * Bug options
   */
  options: BugOptions

  /**
   * Initializes an error of type Bug
   * @param message {string} Error messages
   * @param options {BugOptions} Error options
   */
  constructor(message: string, options: BugOptions) {
    super(message)
    this.options = options
  }
}
export class Abort extends Error {}

export const handler = (error: Error): Promise<Error> => {
  let errorLog: ErrorLog
  let errorType: ErrorLogType
  let message = formatBold(formatRed('Error'))

  if (error instanceof Bug) {
    errorType = 'bug'
  } else if (error instanceof Abort) {
    errorType = 'abort'
  } else {
    errorType = 'unhandled'
  }
  message = `${message}\n${error.message}`

  coreLogger().error({
    type: errorType,
    message: message,
  })

  return Promise.resolve(error)
}
