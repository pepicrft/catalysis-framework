import pathe from 'path'

export { findUp } from 'find-up'

export const dirname = (path: string): string => {
  return pathe.dirname(path)
}

export const join = (...paths: string[]): string => {
  return pathe.join(...paths)
}
