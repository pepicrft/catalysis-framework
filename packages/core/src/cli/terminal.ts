import { bold as pcBold, cyan as pcCyan, gray as pcGray } from 'picocolors'

/**
 * Given a string, it returns its bold-formatted version
 * to be output in a terminal.
 * @param input {string} String to be formatted.
 * @returns {string} Bold-formatted string following ANSI escape code
 * @returns
 */
export function formatBold(input: string): string {
  return pcBold(input)
}

/**
 * Given a string, it returns its cyan-formatted version
 * to be output in a terminal.
 * @param input {string} String to be formatted.
 * @returns {string} Cyan-formatted string following ANSI escape code
 * @returns
 */
export function formatCyan(input: string): string {
  return pcCyan(input)
}

/**
 * Given a string, it returns its cyan-formatted version
 * to be output in a terminal.
 * @param input {string} String to be formatted.
 * @returns {string} Cyan-formatted string following ANSI escape code
 * @returns
 */
export function formatGray(input: string): string {
  return pcGray(input)
}
