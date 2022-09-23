// TODO: Move to fs
export { default as glob } from 'fast-glob'
import process from 'node:process'
import {
  dirname as patheDirname,
  basename,
  resolve,
  parse,
  join,
  relative,
} from 'pathe'
import { fileURLToPath } from 'node:url'
export {
  absolutePath,
  relativePath,
  AbsolutePath,
  RelativePath,
} from 'typed-file-system-path'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import commondir from 'commondir'
import { AbsolutePath } from 'typed-file-system-path'

/**
 * Joins all given path components together using the platform-specific separator as a delimiter,
 * then normalizes the resulting path.
 * Zero-length path segments are ignored. If the joined path string is a zero-length string then '.' will be returned,
 * representing the current working directory.
 * @param paths {string[]} The path components to concatenate.
 * @returns Joined path.
 */
export function joinPath(...components: string[]): string {
  return join(...components)
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
 * Given a path, it returns the path of the parent directory.
 * @param path {string} Path to the directory of the given path.
 * @returns {string} The path to the parent directory.
 */
export function parentDirectory(path: string): string {
  return patheDirname(path)
}

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
 * Given a path, it returns the last component. For example, if the path
 * is /src/project/index.ts, pathBasename will yield "index.ts".
 * @param path {string} Path those basename will be returned.
 * @returns {string} The path basename.
 */
export function pathBasename(path: string): string {
  return basename(path)
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

/**
 * Solve the relative path from {from} to {to}. At times we have two absolute paths,
 * and we need to derive the relative path from one to the other. For example:
 *   - From: /path/to/project
 *   - To: /path/to/project/src/index.ts
 *   - Output: src/index.ts
 * @param from {string} Path used as a reference.
 * @param to {string} Path to relativize.
 * @returns {string} The relative path.
 */
export function relativePathFrom(from: string, to: string): string {
  return relative(from, to)
}

/**
 * Given an absolute filesystem path, it makes it relative to
 * the current working directory. This is useful when logging paths
 * to allow the users to click on the file and let the OS open it
 * in the editor of choice.
 * @param path {string} Path to relativize
 * @returns {string} Relativized path.
 */
export function relativizePath(path: string | AbsolutePath): string {
  const result = commondir([path, process.cwd()])
  if (result !== '/') {
    return relativePathFrom(process.cwd(), `${path}`)
  } else {
    return `${path}`
  }
}

/**
 * It resolves a sequence of paths or path segments into an absolute path.
 * @param pathComponents {string[]} String paths to join. Non-string arguments are ignored.
 * @returns {string} Resolved path.
 */
export function resolvePath(...pathComponents: string[]): string {
  return resolve(...pathComponents)
}
