export { findUp } from 'find-up'
export { default as glob } from 'fast-glob'
export * from 'pathe'
import process from 'node:process'
export { pathEqual } from 'path-equal'
import { relative as relativePath } from 'pathe'
import { fileURLToPath } from 'url'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import commondir from 'commondir'

/**
 * Given an absolute filesystem path, it makes it relative to
 * the current working directory. This is useful when logging paths
 * to allow the users to click on the file and let the OS open it
 * in the editor of choice.
 * @param path {string} Path to relativize
 * @returns {string} Relativized path.
 */
export function relativize(path: string): string {
  const result = commondir([path, process.cwd()])
  if (result !== '/') {
    return relativePath(process.cwd(), path)
  } else {
    return path
  }
}

/**
 * This function ensures the correct decodings of percent-encoded characters as
 * well as ensuring a cross-platform valid absolute path string.
 * @param url {URL} URL to obtain the path from.
 * @returns {string} The string representing the path.
 */
export function fromURL(url: string | URL): string {
  return fileURLToPath(url)
}
