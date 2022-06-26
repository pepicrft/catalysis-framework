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
  prompt,
} from './terminal'
import terminalLink from 'terminal-link'
import { describe, test, expect, vi, it } from 'vitest'
import pc from 'picocolors'
import inquirer from 'inquirer'

vi.mock('terminal-link')
vi.mock('picocolors')
vi.mock('inquirer')

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

describe('prompt', () => {
  it('delegates the prompting to inquirer', async () => {
    // When
    vi.mocked(inquirer.prompt).mockResolvedValue({
      name: 'gestalt',
    })
    const promptType = 'input'
    const promptMessage = 'Introduce your name'
    const response = await prompt(
      {
        name: {
          type: promptType,
          message: promptMessage,
        },
      },
      { name: 'answered-name' }
    )

    // Then
    expect(inquirer.prompt).toHaveBeenCalledWith(
      [
        {
          name: 'name',
          type: promptType,
          message: promptMessage,
        },
      ],
      { name: 'answered-name' }
    )
    expect(response.name).toEqual('gestalt')
  })
})
