import pathe from 'path'

export { findUp } from 'find-up'

//@josemasar: DO NOT DELETE, used in server.ts
export const dirname = (path: string): string => {
  return pathe.dirname(path)
}

export const join = (...paths: string[]): string => {
  return pathe.join(...paths)
}

//@josemasar: DO NOT DELETE, used in server.ts
export const resolve = (...paths: string[]): string => {
  return pathe.resolve(...paths)
}
