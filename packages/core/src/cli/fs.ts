import fs from 'fs-extra'

export async function exists(path: string): Promise<boolean> {
  return fs.pathExists(path)
}

//@josemasar: giving error

// export async function readFileSync(
//   path: string,
//   { encoding, flag }: { encoding?: null | undefined; flag?: string | undefined }
// ): Promise<Buffer> {
//   return fs.readFileSync(path, { encoding, flag })
// }
