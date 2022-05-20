import {
  join as pathJoin,
  glob,
  relative as relativePath,
} from '../../../../../node/path.public'

/**
 * This functions finds all the layout files under a target's routes directory,
 * and returns an object where the key represents the URL path prefix to match
 * the routes affected by this layout. The values represent the path to the file
 * module exporting the layout through a default export.
 * @param routesDirectory {string} Path to the target's routes directory.
 * @returns
 */
export async function loadLayouts(
  routesDirectory: string
): Promise<{ [key: string]: string }> {
  const layouts = await glob(pathJoin(routesDirectory, '**/_layout.*'))
  const layoutEntries = layouts.map((layoutFile) => {
    const urlPath = `/${relativePath(
      routesDirectory,
      layoutFile.split('_layout')[0]
    )}`
    return [urlPath, layoutFile]
  })
  return Object.fromEntries(layoutEntries)
}
