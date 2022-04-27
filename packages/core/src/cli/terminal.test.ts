import {
  formatBold,
  formatItalic,
  formatGreen,
  formatYellow,
  formatRed,
  formatGray,
  formatMagenta,
  formatCyan,
  link,
} from './terminal'
import terminalLink from 'terminal-link'
import { describe, test, expect, vi } from 'vitest'
import pc from 'picocolors'

vi.mock('terminal-link')
vi.mock('picocolors')

describe('link', () => {
  test('delegates to terminal-link', () => {
    // Given
    const hyperlink = 'hyperlink'
    const name = 'name'
    const url = 'https://gestaltjs.org'
    vi.mocked(terminalLink).mockReturnValue(hyperlink)

    // When
    const got = link(name, url)

    // Then
    expect(terminalLink).toHaveBeenCalledWith(name, url)
    expect(got).toEqual(hyperlink)
  })
})

describe('formatBold', () => {
  test('delegates to picocolors', () => {
    // When
    const formattedString = 'formatted'
    const stringToFormat = 'string'

    vi.mocked(pc.bold).mockReturnValue(formattedString)

    // When
    const got = formatBold(stringToFormat)

    // Then
    expect(got).toEqual(formattedString)
  })
})

describe('formatItalic', () => {
  test('delegates to picocolors', () => {
    // When
    const formattedString = 'formatted'
    const stringToFormat = 'string'

    vi.mocked(pc.italic).mockReturnValue(formattedString)

    // When
    const got = formatItalic(stringToFormat)

    // Then
    expect(got).toEqual(formattedString)
  })
})

describe('formatGreen', () => {
  test('delegates to picocolors', () => {
    // When
    const formattedString = 'formatted'
    const stringToFormat = 'string'

    vi.mocked(pc.green).mockReturnValue(formattedString)

    // When
    const got = formatGreen(stringToFormat)

    // Then
    expect(got).toEqual(formattedString)
  })
})

describe('formatYellow', () => {
  test('delegates to picocolors', () => {
    // When
    const formattedString = 'formatted'
    const stringToFormat = 'string'

    vi.mocked(pc.yellow).mockReturnValue(formattedString)

    // When
    const got = formatYellow(stringToFormat)

    // Then
    expect(got).toEqual(formattedString)
  })
})

describe('formatRed', () => {
  test('delegates to picocolors', () => {
    // When
    const formattedString = 'formatted'
    const stringToFormat = 'string'

    vi.mocked(pc.red).mockReturnValue(formattedString)

    // When
    const got = formatRed(stringToFormat)

    // Then
    expect(got).toEqual(formattedString)
  })
})

describe('formatGray', () => {
  test('delegates to picocolors', () => {
    // When
    const formattedString = 'formatted'
    const stringToFormat = 'string'

    vi.mocked(pc.gray).mockReturnValue(formattedString)

    // When
    const got = formatGray(stringToFormat)

    // Then
    expect(got).toEqual(formattedString)
  })
})

describe('formatMagenta', () => {
  test('delegates to picocolors', () => {
    // When
    const formattedString = 'formatted'
    const stringToFormat = 'string'

    vi.mocked(pc.magenta).mockReturnValue(formattedString)

    // When
    const got = formatMagenta(stringToFormat)

    // Then
    expect(got).toEqual(formattedString)
  })
})

describe('formatCyan', () => {
  test('delegates to picocolors', () => {
    // When
    const formattedString = 'formatted'
    const stringToFormat = 'string'

    vi.mocked(pc.cyan).mockReturnValue(formattedString)

    // When
    const got = formatCyan(stringToFormat)

    // Then
    expect(got).toEqual(formattedString)
  })
})
