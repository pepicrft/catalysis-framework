import { AbsolutePath } from 'typed-file-system-path'
import { createProjectBundler } from '../../private/bundler.js'
import { Project } from './project/models/project.js'

export { Project } from './project/models/project.js'
export { Configuration } from './project/models/configuration.js'
export { Plugin } from './project/models/plugin.js'

/**
 * It looks up a project by traversing up the directory structure from the given directory.
 * Once found, it loads a representation in memory and returns it.
 * @param fromDirectory {AbsolutePath} Directory from where the project will be looked up.
 * @returns {Promise<Project>} A promise that resolves with the loaded project.
 */
export async function loadProject(
  fromDirectory: AbsolutePath
): Promise<Project> {
  const bundler = createProjectBundler(fromDirectory)
  return (await bundler).load()
}
