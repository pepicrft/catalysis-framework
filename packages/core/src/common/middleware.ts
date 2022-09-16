import { ExtendableError } from './error.js'
import { Request, Response } from './fetch.js'

/**
 * An error to be used when a middleware tries to access
 * a key from the input context that doesn't exist.
 * @param middlewareId {string} The id of the middleware. This is useful to help locate the middleware.
 * @param key {string} The key that was being accessed.
 * @returns {ExtendableError} An ExtendableError.
 */
export class MiddlewareInputKeyNotFoundError extends ExtendableError {
  constructor(middlewareId: string, key: string) {
    super(
      `The middleware ${middlewareId} tried to fetch the key ${key} but it was not found in the context`
    )
  }
}

/**
 * An error to be used when a middleware tries to set a new
 * value to the context using a key that already exists.
 * @param middlewareId {string} The id of the middleware. This is useful to help locate the middleware.
 * @param key {string} The key that was being accessed.
 * @returns {ExtendableError} An ExtendableError.
 */
export class MiddlewareSettingExistingKeyError extends ExtendableError {
  constructor(middlewareId: string, key: string) {
    super(
      `The middleware ${middlewareId} tried to set the key ${key} but it already exists in the context`
    )
  }
}

/**
 * An interface that represents the input argument of a middleware.
 */
export interface MiddlewareInput {
  /**
   * The HTTP request object.
   */
  readonly request: Request
  /**
   * It stores data under a given key to pass it to the next middleware.
   * @param key {string} The key under which to store the data.
   * @param data {any} The data to store.
   * @throws
   */
  set(key: string, data: any): void

  /**
   * Returns the context data stored under a given key.
   * @param key {string} The key under which the data is stored.
   * @returns {any} The data stored under the given key.
   */
  fetch(key: string): any

  /**
   * Returns true if the key exists in the context.
   * @param key {string} The key under which the data is stored.
   * @returns {boolean} True if the key exists in the context.
   */
  hasKey(key: string): boolean
}

export class MiddlewareInputImplementation implements MiddlewareInput {
  middlewareId: string
  request: Request
  context: { [key: string]: any }

  constructor(
    middlewareId: string,
    request: Request,
    context: { [key: string]: any }
  ) {
    this.middlewareId = middlewareId
    this.request = request
    this.context = context
  }

  set(key: string, data: any) {
    if (this.hasKey(key)) {
      throw new MiddlewareSettingExistingKeyError(this.middlewareId, key)
    }
    this.context[key] = data
  }

  fetch(key: string): any {
    const value = this.context[key]
    if (!value) {
      throw new MiddlewareInputKeyNotFoundError(this.middlewareId, key)
    }
    return value
  }

  hasKey(key: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.context, key)
  }
}

/**
 * An interface that represents the output of a middleware.
 */
export type MiddlewareOutput =
  /**
   * When do is 'skip', the next middleware will be executed.
   */
  | {
      do: 'skip'
    }
  /**
   * When do is 'respond', the response under 'with' will be returned to the client.
   */
  | {
      do: 'respond'
      with: Response
    }

export type Middleware =
  | ((input: MiddlewareInput) => Promise<MiddlewareOutput>)
  | ((input: MiddlewareInput) => MiddlewareOutput)
