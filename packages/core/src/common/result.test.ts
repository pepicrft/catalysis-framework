import { Err, Ok } from './result'
import { vi, describe, test, it, expect } from 'vitest'
import ExtendableError from 'ts-error'

class TestError extends ExtendableError {}

describe('valueOrThrow', () => {
  it('throws when the result instance represents a failure', () => {
    // Given
    const error = new TestError('test')
    const subject = Err(error)

    // When/Then
    expect(() => {
      subject.valueOrThrow()
    }).to.toThrowError(error)
  })

  it('returns the value when the result instance represents a success', () => {
    // Given
    const value = 'test'
    const subject = Ok(value)

    // When/Then
    expect(subject.valueOrThrow()).toEqual(value)
  })
})

describe('mapValue', () => {
  test('maps the value when the result instance represents a success', () => {
    // Given
    const value = 'test'
    const subject = Ok(value)

    // When/Then
    expect(
      subject.mapValue((wrappedValue) => wrappedValue + wrappedValue).value
    ).toEqual('testtest')
  })

  test("doesn't map the value when the result instance represents a failure", () => {
    // Given
    const error = new TestError('test')
    const subject = Err<string, TestError>(error)

    // When/Then
    expect(
      subject.mapValue((wrappedValue) => wrappedValue + wrappedValue).error
    ).toEqual(error)
  })
})

describe('mapError', () => {
  test('maps the error when the result instance represents a failure', () => {
    // Given
    const error = new TestError('test')
    const subject = Err<string, TestError>(error)
    const mappedError = new TestError('mapped')

    // When/Then
    expect(subject.mapError((_) => mappedError).error).toEqual(mappedError)
  })

  test("doesn't map the error when the result instance represents a failure", () => {
    // Given
    const value = 'test'
    const subject = Ok(value)
    const mappedError = new TestError('mapped')

    // When/Then
    expect(subject.mapError((_) => mappedError).value).toEqual(value)
  })
})
