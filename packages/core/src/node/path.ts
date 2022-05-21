export { findUp as findPathUp } from 'find-up'
export { default as glob } from 'fast-glob'
import process from 'node:process'
import {
  relative as relativePath,
  dirname as patheDirname,
  basename,
  resolve,
  parse,
  join,
} from 'pathe'
import { fileURLToPath } from 'url'
export { relative, parse } from 'pathe'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import commondir from 'commondir'

/**
 * Parses a string that represents a path and returns a path.ParsedPath
 * instance that exposes attributes to access information about the path.
 * @param path {path.ParsedPath} Parsed path.
 * @returns
 */
export function parsePath(path: string): ReturnType<typeof parse> {
  return parse(path)
}

/**
 * The right-most parameter is considered {to}. Other parameters are considered an array of {from}.
 * Starting from leftmost {from} parameter, resolves {to} to an absolute path.
 * If {to} isn't already absolute, {from} arguments are prepended in right to left order, until an absolute path is found. If after using all {from} paths still no absolute path is found, the current working directory is used as well. The resulting path is normalized, and trailing slashes are removed unless the path gets resolved to the root directory.
 * @param pathComponents {string[]} String paths to join. Non-string arguments are ignored.
 * @returns {string} Resolved path.
 */
export function resolvePath(...pathComponents: string[]): string {
  return resolve(...pathComponents)
}

/**
 * Given a path, it returns the last component. For example, if the path
 * is /src/project/index.ts, pathBasename will yield "index.ts".
 * @param path {string} Path those basename will be returned.
 * @returns {string} The path basename.
 */
export function pathBasename(path: string): string {
  return basename(path)
}

/**
 * Given a path, it returns the path of the parent directory.
 * @param path {string} Path to the directory of the given path.
 * @returns {string} The path to the parent directory.
 */
export function parentDirectory(path: string): string {
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
