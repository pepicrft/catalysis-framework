import { AbsolutePath } from 'typed-file-system-path'
import { Project } from './project/project.js'

export { Project } from './project/project.js'
export { Configuration } from './project/configuration.js'

/**
 * It looks up a project by traversing up the directory structure from the given directory.
 * Once found, it loads a representation in memory and returns it.
 * @param fromDirectory {AbsolutePath} Directory from where the project will be looked up.
 * @returns {Promise<Project>} A promise that resolves with the loaded project.
 */
export async function loadProject(
  fromDirectory: AbsolutePath
): Promise<Project> {
  // TODO: Load the project
  const project: Project = {} as Project
  return project
}
