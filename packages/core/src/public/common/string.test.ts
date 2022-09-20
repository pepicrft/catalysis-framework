import { describe, expect, test } from 'vitest'
import { hyphenCased, pascalCased, pluralized } from './string'

describe('pascalCased', () => {
  test('returns the string pascal-cased', () => {
    expect(pascalCased('my-project')).toEqual('MyProject')
  })
})

describe('hyphenCased', () => {
  test('returns the string hyphen-cased', () => {
    expect(hyphenCased('my project')).toEqual('my-project')
  })
})

describe('pluralized', () => {
  test('returns the pluralized version of the string', () => {
    expect(pluralized('project')).toEqual('projects')
  })
})
