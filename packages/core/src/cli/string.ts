import { pascalCase as pc } from 'case-anything'
import plur from 'plur'

/**
 * Given a string it returns its pascal-case version.
 * @param input {string} String to turn into pascal case.
 * @returns {string} Pascal-cased string
 */
export function pascalCased(input: string): string {
  return pc(input)
}

/**
 * Returns the pluralized version of a word.
 * @param word {string} Word to pluralize
 * @returns
 */
export function pluralized(word: string): string {
  return plur(word)
}
