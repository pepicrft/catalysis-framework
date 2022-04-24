import { Project } from './project/models/project'
import { loadProject } from './project/load/project'
import { Plugin } from './plugin/models/plugin'
import { loadPlugins } from './plugin/load/plugin'

/**
 * Load is a convenient function for looking up a project by traversing up the directory structure
 * and loading it alongside its plugins.
 * @param fromDirectory {string} Path to the directory from where to load the project and its plugins.
 * @returns A promise that resolves with the project and its plugins.
 */
export async function load(
  fromDirectory: string
): Promise<{ project: Project; plugins: Plugin[] }> {
  const project = await loadProject(fromDirectory)
  const plugins = await loadPlugins([project.directory])
  return { project, plugins }
}
