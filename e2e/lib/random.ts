/**
 * Generates a random string.
 * @param length {number} String size.
 * @returns The random string.
 */
export function randomString(length = 36): string {
  return Math.random().toString(length).slice(2, 7)
}
