import { Project } from '@gestaltjs/core/node/project'

type FormatJsonOptions = {
  project: Project
}
export function formatJson(options: FormatJsonOptions): string {
  return JSON.stringify(options.project, null, 2)
}
