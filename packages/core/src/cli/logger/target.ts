/**
 * A logger target abstracts away the destination of the logs.
 * This is useful for unit tests where we don't want to log through
 * the Pino stack.
 */
export interface LoggerTarget {
  child(options: { module: string }): LoggerTarget
  error(object: any, message: string): any
  debug(object: any, message: string): any
  info(object: any, message: string): any
  warn(object: any, message: string): any
}

/**
 * A logger target that does nothing with the logs.
 */
export class NoopLoggerTarget implements LoggerTarget {
  child(options: { module: string }): LoggerTarget {
    return this
  }

  error(object: any, message: string): any {
    // noop
  }
  debug(object: any, message: string): any {
    // noop
  }
  info(object: any, message: string): any {
    // noop
  }
  warn(object: any, message: string): any {
    // noop
  }
}
