import { project } from '@gestaltjs/core/cli'

type FormatJsonOptions = {
  project: project.models.Project
}
export function formatJson(options: FormatJsonOptions): string {
  return JSON.stringify(options.project, null, 2)
}
