import pc from 'picocolors'
import terminalLink from 'terminal-link'
import inquirer from 'inquirer'
export * as listr from 'listr2'

/**
 * Formats a string to be bold when presented
 * in a terminal.
 * It uses ANSI escape codes:
 *   https://en.wikipedia.org/wiki/ANSI_escape_code
 * @param input {string} String to format as bold
 * @returns {string} Formatted string.
 */
export function formatBold(input: string): string {
  return pc.bold(input)
}

/**
 * Formats a string to be italic when presented
 * in a terminal.
 * It uses ANSI escape codes:
 *   https://en.wikipedia.org/wiki/ANSI_escape_code
 * @param input {string} String to format as italic
 * @returns {string} Formatted string.
 */
export function formatItalic(input: string): string {
  return pc.italic(input)
}

/**
 * Formats a string to have the green color when presented
 * in a terminal.
 * It uses ANSI escape codes:
 *   https://en.wikipedia.org/wiki/ANSI_escape_code
 * @param input {string} String to format as green
 * @returns {string} Formatted string.
 */
export function formatGreen(input: string): string {
  return pc.green(input)
}

/**
 * Formats a string to have the yellow color when presented
 * in a terminal.
 * It uses ANSI escape codes:
 *   https://en.wikipedia.org/wiki/ANSI_escape_code
 * @param input {string} String to format as yellow
 * @returns {string} Formatted string.
 */
export function formatYellow(input: string): string {
  return pc.yellow(input)
}

/**
 * Formats a string to have the red color when presented
 * in a terminal.
 * It uses ANSI escape codes:
 *   https://en.wikipedia.org/wiki/ANSI_escape_code
 * @param input {string} String to format as red
 * @returns {string} Formatted string.
 */
export function formatRed(input: string): string {
  return pc.red(input)
}

/**
 * Formats a string to have the gray color when presented
 * in a terminal.
 * It uses ANSI escape codes:
 *   https://en.wikipedia.org/wiki/ANSI_escape_code
 * @param input {string} String to format as gray
 * @returns {string} Formatted string.
 */
export function formatGray(input: string): string {
  return pc.gray(input)
}

/**
 * Formats a string to have the magenta color when presented
 * in a terminal.
 * It uses ANSI escape codes:
 *   https://en.wikipedia.org/wiki/ANSI_escape_code
 * @param input {string} String to format as magenta
 * @returns {string} Formatted string.
 */
export function formatMagenta(input: string): string {
  return pc.magenta(input)
}

/**
 * Formats a string to have the cyan color when presented
 * in a terminal.
 * It uses ANSI escape codes:
 *   https://en.wikipedia.org/wiki/ANSI_escape_code
 * @param input {string} String to format as cyan
 * @returns {string} Formatted string.
 */
export function formatCyan(input: string): string {
  return pc.cyan(input)
}

/**
 * When the terminal supports it, it returns an hyperlink
 * that's clickable. If not, it returns the URL instead.
 *
 * @param name {string} Name of the link
 * @param url {string} URL the hyperlink points to.
 * @returns {string} Hyperlink
 */
export function link(name: string, url: string): string {
  return terminalLink(name, url)
}

interface PromptQuestion {}
interface InputQuestion extends PromptQuestion {}

/**
 * A type that represents a list of questions indexed
 * by the identifiers. The same identifiers will be used
 * in the returned object to refer to the answers.
 */
type PromptQuestions = {
  [Identifier: string]: PromptQuestion
}

/**
 * A type that represents the answer to a question. The
 * type of the answer depends on the type of question.
 * For example, the answer to a yes/no question yields
 * a boolean response type.
 */
type PromptAnswer<T extends PromptQuestion> = T extends InputQuestion
  ? string
  : string

/**
 * A type that contains all the answers indexed by the
 * same identifier as the questions they are associated to.
 */
type PromptAnswers<T extends PromptQuestions> = {
  [Identifier in keyof T]: PromptAnswer<T[Identifier]>
}

/**
 * The function prompts the user interactively in the terminal.
 * Note that this API only works if the terminal in which the process
 * is running is an interactive terminal. A CI environment is an example
 * of a non-interactive terminal.
 * @param questions {T extends PromptQuestions} The questions to be prompted.
 * @returns
 */
export async function prompt<T extends PromptQuestions>(
  questions: T
): Promise<PromptAnswers<T>> {
  const result = await inquirer.prompt([
    {
      name: 'x',
      type: 'input',
    },
  ])
  return result as PromptAnswers<T>
}
