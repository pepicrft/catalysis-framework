import tempy from 'tempy'

/**
 * Creates a temporary directory and ties its lifecycle to the lifecycle of the callback.
 * @param callback - Callback whose lifecycle is tied to the lifecycle of the temporary directory.
 */
export async function directory<T>(
  callback: (temporaryDirectory: string) => T
) {
  return tempy.directory.task(callback)
}
