import tempy from 'tempy'

export async function directory<T>(callback: (directory: string) => T) {
  await tempy.directory.task(callback)
}
