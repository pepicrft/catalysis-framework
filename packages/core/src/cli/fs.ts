import fs from 'fs-extra'

export async function exists(path: string): Promise<boolean> {
  return fs.pathExists(path)
}

//@josemasar: DO NOT DELETE, used in server.ts
//https://nodejs.org/api/fs.html#fsreadfilesyncpath-options
// @pepibimur, I need to provide types for options to pass the encoding - help!?
export async function readFile(path: string, [options]): Promise<Buffer> {
  return fs.readFileSync(path)
}
