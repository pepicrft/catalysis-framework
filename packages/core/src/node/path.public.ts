export { findUp as findPathUp } from 'find-up'
export { default as glob } from 'fast-glob'
import process from 'node:process'
import { relative as relativePath, dirname as patheDirname } from 'pathe'
import { fileURLToPath } from 'url'
export { basename, resolve, relative, parse } from 'pathe'
import { join } from 'pathe'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import commondir from 'commondir'

/**
 * Given a path, it returns the path of the parent directory.
 * @param path {string} Path to the directory of the given path.
 * @returns {string} The path to the parent directory.
 */
export function dirname(path: string): string {
  return patheDirname(path)
}

/**
 * Joins path components to form a path.
 * @param paths {string[]} The path components to concatenate.
 * @returns Joined path.
 */
export function joinPath(...paths: string[]): string {
  return join(...paths)
}

/**
 * This utility function replaces the CJS __dirname variable exposed
 * by Node. This method is expected to be invoked passing the import.meta.url
 * variable that represents the caller's module.
 * @param url {URL} The module URL obtained from import.meta.url
 * @returns
 */
export function moduleDirname(url: string): string {
  return patheDirname(fileURLToPath(url))
}

/**
 * Given an absolute filesystem path, it makes it relative to
 * the current working directory. This is useful when logging paths
 * to allow the users to click on the file and let the OS open it
 * in the editor of choice.
 * @param path {string} Path to relativize
 * @returns {string} Relativized path.
 */
export function relativizePath(path: string): string {
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
export function pathFromURL(url: string | URL): string {
  return fileURLToPath(url)
}
