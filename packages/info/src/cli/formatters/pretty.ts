import { project } from '@gestaltjs/core/cli'

export function prettyFormat(project: project.Project): string {
  const lines: string[] = []
  lines.push('Project information')
  lines.push(`Directory: ${project.directory}`)
  return lines.join('\n')
}
