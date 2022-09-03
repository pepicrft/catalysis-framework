import { Project } from '@gestaltjs/core/common/models'
import { encodeJson } from '@gestaltjs/core/node/json'

type FormatJsonOptions = {
  project: Project
}

export function formatJson(options: FormatJsonOptions): string {
  return encodeJson(options.project, undefined, 2)
}
