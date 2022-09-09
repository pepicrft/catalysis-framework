import { coreLogger, stringify } from '../node/logger.js'
import type { ErrorLogType, LoggerMessage } from '../node/logger.js'
import { formatYellow, formatRed, formatBold } from '../node/terminal.js'
import StackTracey from 'stacktracey'
import { ExtendableError } from 'ts-error'
export { ExtendableError } from 'ts-error'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import sourceMapSupport from 'source-map-support'
sourceMapSupport.install()

/**
 * `FatalError` represents an error that causes the execution of the program
 * to terminate. All handled errors must subclass from `FatalError` for the
 * error handling logic to apply standard formatting and exit gracefully.
 * Note that this class extends `ExtendableError` instead of `Error`.
 * The `Error` class in Javascript is not designed to be extended and
 * that leads to some shortcomings:
 *  * We can't add new properties.
 *  * We can't use instanceof to check the error type.
 * `ExtendableError` addresses those shortcomings and many others tha are listed
 * in the repository's README:
 * {@link https://www.npmjs.com/package/ts-error}
 */
class FatalError extends ExtendableError {}

type ErrorOptions = {
  /**
   * The cause of the error.
   * Note that in some scenarios, the developer raising
   * a bug might not have enough information to include
   * a cause. In that case, the error is raised without
   * a cause with the aim of iterating on it once we have
   * additional context from the bug report.
   */
  cause?: LoggerMessage
}
/**
 * It defines the interface of the options
 * object a bug error is initialized with.
 */
type BugOptions = Partial<ErrorOptions>

/**
 * A bug error is an error that represents that represents
 * a bug and should be tracked for fixing.
 */
export class Bug extends FatalError {
  /**
   * Bug options
   */
  options: BugOptions

  /**
   * Initializes an error of type Bug
   * @param message {string} Error messages
   * @param options {BugOptions} Error options
   */
  constructor(message: LoggerMessage, options: BugOptions = {}) {
    super(stringify(message))
    this.options = options
  }
}

/**
 * An error that represents a bug but that doesn't
 * get presented to the user.
 */
export class BugSilent extends FatalError {}

type AbortOptions = ErrorOptions & { next?: LoggerMessage }

/**
 * An error that aborts the execution of the program
 * and that is not presented to the user by the
 * error handler.
 */
export class AbortSilent extends FatalError {}

/**
 * An error that aborts the execution of the program.
 */
export class Abort extends FatalError {
  /**
   * Bug options
   */
  options: AbortOptions

  /**
   * Initializes an error of type Bug
   * @param message {string} Error messages
   * @param options {BugOptions} Error options
   */
  constructor(message: LoggerMessage, options: AbortOptions = {}) {
    super(stringify(message))
    this.options = options
  }
}

/**
 * A function that handles the errors that bubble up to the CLI's root.
 * The function applies standard formatting and outputs the error to
 * the user.
 * @param error {Error} Instace of the error to be handled
 * @returns
 */
export async function errorHandler(error: Error): Promise<Error> {
  let errorType: ErrorLogType
  let shouldPrint = true
  let message = `\n${formatBold(formatRed('Error'))}`
  let cause: string | undefined
  let next: string | undefined

  if (error instanceof Bug) {
    errorType = 'bug'
    cause = error?.options?.cause ? stringify(error?.options?.cause) : undefined
  } else if (error instanceof BugSilent) {
    errorType = 'bug'
    shouldPrint = false
  } else if (error instanceof Abort) {
    errorType = 'abort'
    cause = error?.options?.cause ? stringify(error?.options?.cause) : undefined
    next = error?.options?.next ? stringify(error?.options?.next) : undefined
  } else if (error instanceof AbortSilent) {
    errorType = 'abort'
    shouldPrint = false
  } else {
    errorType = 'unhandled'
  }
  if (!shouldPrint) {
    return error
  }
  message = `${message}\n${error.message}\n`

  if (cause) {
    message = `${message}\n${formatBold(formatRed('CAUSE'))}\n`
    message = `${message}${cause}\n`
  }

  if (next) {
    message = `${message}\n${formatBold(formatRed('NEXT'))}\n`
    message = `${message}${next}\n`
  }

  if (error.stack && errorType === 'bug') {
    let stack = await new StackTracey(error).withSourcesAsync()
    stack = stack
      .filter((entry) => {
        return !entry.file.includes('@oclif/core')
      })
      .map((item) => {
        item.calleeShort = formatYellow(item.calleeShort)
        return item
      })
    if (stack.items.length !== 0) {
      const stackString = stack.asTable({})
      message = `${message}\n${formatBold(formatRed('Stack trace 🐛'))}\n`
      message = `${message}${stackString}`
    }
  }

  coreLogger().error({
    type: errorType,
    message: message,
    error: {
      message: error.message,
      cause,
      next,
    },
  })

  return Promise.resolve(error)
}
