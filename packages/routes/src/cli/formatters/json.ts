import { Project } from '@gestaltjs/core/common/models'

type FormatJsonOptions = {
  project: Project
}
export function formatJson(options: FormatJsonOptions): string {
  return JSON.stringify(options.project, null, 2)
}
