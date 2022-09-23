import { Project } from '@gestaltjs/core/node/project'
import { encodeJson } from '@gestaltjs/core/node/json'

type FormatJsonOptions = {
  project: Project
}

export function formatJson(options: FormatJsonOptions): string {
  return encodeJson(options.project, undefined, 2)
}
