import { project } from '@gestaltjs/core/cli'

export function formatJson(project: project.Project): string {
  return JSON.stringify(project, null, 2)
}
