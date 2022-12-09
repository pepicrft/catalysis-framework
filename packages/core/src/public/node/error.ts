import { coreLogger } from '../node/logger.js'
import { formatYellow, formatRed, formatBold } from '../node/terminal.js'
import StackTracey from 'stacktracey'
import { Abort, AbortSilent, Bug, BugSilent } from '../common/error.js'
import { ErrorLogType, stringify } from '../common/logger.js'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import sourceMapSupport from 'source-map-support'
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
sourceMapSupport.install()

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
