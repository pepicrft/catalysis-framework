/**
 * ExtendableError is an extendable error class that actually works with TypeScript
 * and ES6 support compatible with all environments, even very old browsers.
 *
 * We've vendored the implementation from the ts-error project:
 *  - https://github.com/gfmio/ts-error
 */
export class ExtendableError extends Error {
  constructor(...params: ConstructorParameters<typeof Error>) {
    super(...params)
    const message =
      params.length > 0 && typeof params[0] === 'string' ? params[0] : ''

    // Replace Error with ClassName of the constructor, if it has not been overwritten already
    if (this.name === undefined || this.name === 'Error') {
      Object.defineProperty(this, 'name', {
        configurable: true,
        enumerable: false,
        value: this.constructor.name,
        writable: true,
      })
    }

    Object.defineProperty(this, 'message', {
      configurable: true,
      enumerable: false,
      value: message,
      writable: true,
    })

    Object.defineProperty(this, 'stack', {
      configurable: true,
      enumerable: false,
      value: '',
      writable: true,
    })

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    } else if (this.stack === '') {
      this.stack = new Error(message).stack
    }
  }
}

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
  cause?: string
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
  constructor(message: string, options: BugOptions = {}) {
    super(message)
    this.options = options
  }
}

/**
 * An error that represents a bug but that doesn't
 * get presented to the user.
 */
export class BugSilent extends FatalError {}

type AbortOptions = ErrorOptions & { next?: string }

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
  constructor(message: string, options: AbortOptions = {}) {
    super(message)
    this.options = options
  }
}
