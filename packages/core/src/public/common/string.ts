import { pascalCase, kebabCase } from 'case-anything'
import plur from 'plur'

/**
 * Given a string it returns its pascal-case version.
 * @param input {string} String to turn into pascal case.
 * @returns {string} Pascal-cased string
 */
export function pascalCased(input: string): string {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
  return pascalCase(input)
}

/**
 * Given a string, it returns it hyphen-case version.
 * @param input  {string} String to turn into hyphen case.
 * @returns {string} Hyphen-cased string
 *
 * @example
 *    hyphenCased("my app") === "my-app"
 */
export function hyphenCased(input: string): string {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
  return kebabCase(input)
}

/**
 * Returns the pluralized version of a word.
 * @param word {string} Word to pluralize
 * @returns {string} Pluralized string
 *
 * @example
 *    pluralized("project") === "projects"
 */
export function pluralized(word: string): string {
  return plur(word)
}
