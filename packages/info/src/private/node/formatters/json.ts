import { Project } from '@gestaltjs/core/node/project'
import { encodeJSON } from '@gestaltjs/core/common/json'

type FormatJsonOptions = {
  project: Project
}

export function formatJson(options: FormatJsonOptions): string {
  return encodeJSON(options.project, undefined, 2)
}
