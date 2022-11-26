import ExtendableError from 'ts-error'

/**
 * A type that represents a promise whose value is a result type.
 */
export type AsyncResult<
  T,
  E extends ExtendableError = ExtendableError
> = Promise<Result<T, E>>

export interface Result<T, E extends ExtendableError = ExtendableError> {
  /**
   * Returns the value if the result instance
   * represents a success.
   */
  readonly value: T | undefined

  /**
   * Returns the error if the result
   * instance represents a failure.
   */
  readonly error: E | undefined

  /**
   * Returns the value if the result represents
   * a success state and throws the error otherwise.
   * This function is useful when the caller of a function
   * that returns a Result wants the error to be propagated
   * up.
   */
  valueOrThrow(): T

  /**
   * The function maps the value wrapped in the result instance
   * and returns a new result type with the new value.
   * @param mapper {(T) => U} The function that maps the value.
   */
  mapValue<U>(mapper: (value: T) => U): Result<U, E>

  /**
   * The function maps the error wrapped in the result instance and returns
   * a new result type with the mapped error.
   * @param mapper {(T) => U} The function that maps the error.
   */
  mapError<U extends ExtendableError>(mapper: (error: E) => U): Result<T, U>
}

/**
 * A utility function that creates an instance of Result representing
 * a successful state.
 * @param value {T} Successful state.
 * @returns An instance of Result.
 */
export const Ok = <T, E extends ExtendableError = ExtendableError>(
  value: T
): Result<T, E> => {
  return new ResultImplementation<T, E>(value, undefined)
}

/**
 * A utility functino that creates an instance of Result representing
 * a failure state.
 * @param error {E} Failure state.
 * @returns
 */
export const Err = <T, E extends ExtendableError = ExtendableError>(
  error: E
): Result<T, E> => {
  return new ResultImplementation<T, E>(undefined, error)
}

/**
 * A class that represents the result of an operation. The
 * result can be either a value or an extendable error. Note that
 * this class is private to the module. Consumers of the module should
 * use the exported Err and Ok functions to create an instance of result.
 */
class ResultImplementation<T, E extends ExtendableError>
  implements Result<T, E>
{
  value: T | undefined
  error: E | undefined

  /**
   * Creates a new instance of result. Note that even though the constructor
   * can take invalid states (e.g. passing a value and an error or passing none
   * of them), it should be used passing either one or the other.
   * @param value {T} Success value.
   * @param error {E} Error value.
   */
  constructor(value: T | undefined, error: E | undefined) {
    this.value = value
    this.error = error
  }

  valueOrThrow(): T {
    if (this.value) {
      return this.value
    } else {
      throw this.error
    }
  }

  mapValue<U>(mapper: (value: T) => U): Result<U, E> {
    if (this.value) {
      return new ResultImplementation<U, E>(mapper(this.value), undefined)
    } else {
      return new ResultImplementation<U, E>(undefined, this.error)
    }
  }

  mapError<U extends ExtendableError = ExtendableError>(
    mapper: (error: E) => U
  ): Result<T, U> {
    if (this.error) {
      return new ResultImplementation<T, U>(undefined, mapper(this.error))
    } else {
      return new ResultImplementation<T, U>(this.value, undefined)
    }
  }
}
