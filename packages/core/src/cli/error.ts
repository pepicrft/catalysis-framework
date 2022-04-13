import { core as coreLogger } from './logger'
import type { ErrorLogType } from './logger'
import { formatYellow, formatItalic, formatRed, formatBold } from './terminal'
import StackTracey from 'stacktracey'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import sourceMapSupport from 'source-map-support'
sourceMapSupport.install()

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

/**
 * An error that represents a bug but that doesn't
 * get presented to the user.
 */
export class BugSilent extends Error {}

type AbortOptions = ErrorOptions & { next: string }

/**
 * An error that aborts the execution of the program
 * and that is not presented to the user by the
 * error handler.
 */
export class AbortSilent extends Error {}

/**
 * An error that aborts the execution of the program.
 */
export class Abort extends Error {
  /**
   * Bug options
   */
  options: AbortOptions

  /**
   * Initializes an error of type Bug
   * @param message {string} Error messages
   * @param options {BugOptions} Error options
   */
  constructor(message: string, options: AbortOptions) {
    super(message)
    this.options = options
  }
}

export const handler = async (error: Error): Promise<Error> => {
  let errorType: ErrorLogType
  let message = formatBold(formatRed('What happened 🤨'))
  let cause: string | undefined

  if (error instanceof Bug) {
    errorType = 'bug'
    cause = error?.options?.cause
  } else if (error instanceof Abort) {
    errorType = 'abort'
    cause = error?.options?.cause
  } else {
    errorType = 'unhandled'
  }
  message = `\n${message}\n${error.message}\n`

  if (cause) {
    message = `${message}\n${formatBold(formatRed('Cause 🔍'))}\n`
    message = `${message}${cause}\n`
  }

  if (error.stack) {
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
  })

  return Promise.resolve(error)
}
