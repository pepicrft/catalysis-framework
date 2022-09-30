import { describe, test, expect } from 'vitest'
import { Request } from './fetch.js'
import {
  MiddlewareInputImpl,
  MiddlewareInputKeyNotFoundError,
  MiddlewareSettingExistingKeyError,
} from './middleware.js'

describe('MiddlewareInputKeyNotFoundError', () => {
  test('has the right message', () => {
    // Given
    const subject = new MiddlewareInputKeyNotFoundError('middlewareId', 'key')

    // When/then
    expect(subject.message).toMatchInlineSnapshot(
      '"The middleware middlewareId tried to fetch the key key but it was not found in the context"'
    )
  })
})

describe('MiddlewareSettingExistingKeyError', () => {
  test('has the right message', () => {
    // Given
    const subject = new MiddlewareSettingExistingKeyError('middlewareId', 'key')

    // When/then
    expect(subject.message).toMatchInlineSnapshot(
      '"The middleware middlewareId tried to set the key key but it already exists in the context"'
    )
  })
})

describe('MiddlewareInputImpl', () => {
  test('set throws if the key already exists', () => {
    // Given
    const subject = new MiddlewareInputImpl(
      'middlewareId',
      new Request('http://localhost:3000/'),
      { key: 'test' }
    )

    // When/then
    expect(() => subject.set('key', 'test')).toThrowError(
      new MiddlewareSettingExistingKeyError('middlewareId', 'key')
    )
  })

  test("set stores the data if the key doesn't exist", () => {
    // Given
    const subject = new MiddlewareInputImpl(
      'middlewareId',
      new Request('http://localhost:3000/'),
      {}
    )

    // When
    subject.set('key', 'test')

    // Then
    expect(subject.fetch('key')).toEqual('test')
  })

  test('fetch retrieves the data under the given key if it exists', () => {
    // Given
    const subject = new MiddlewareInputImpl(
      'middlewareId',
      new Request('http://localhost:3000/'),
      { key: 'test' }
    )

    // When/Then
    expect(subject.fetch('key')).toEqual('test')
  })

  test("fetch throws an error the data under the given key doesn't exist", () => {
    // Given
    const subject = new MiddlewareInputImpl(
      'middlewareId',
      new Request('http://localhost:3000/'),
      {}
    )

    // When/Then
    expect(() => subject.fetch('key')).toThrowError(
      new MiddlewareInputKeyNotFoundError('middlewareId', 'key')
    )
  })

  test('hasKey returns true if the key exists in the context', () => {
    // Given
    const subject = new MiddlewareInputImpl(
      'middlewareId',
      new Request('http://localhost:3000/'),
      { key: 'test' }
    )

    // When/Then
    expect(subject.hasKey('key')).toEqual(true)
  })
})
