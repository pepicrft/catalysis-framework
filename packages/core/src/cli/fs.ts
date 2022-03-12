import fs from 'fs-extra'

export async function readFile(path: string): Promise<string> {
  return fs.readFile(path, 'utf-8')
}

export async function writeFile(path: string, data: string): Promise<void> {
  return fs.writeFile(path, data)
}

export async function exists(path: string): Promise<boolean> {
  return fs.pathExists(path)
}

export async function writeDirectory(path: string): Promise<void> {
  return fs.mkdir(path)
}

export async function emptyDir(path: string): Promise<void> {
  return fs.emptyDir(path)
}
