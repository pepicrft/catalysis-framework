import { Project } from '@catalysisdev/core/node/project.js'
import { encodeJSON } from '@catalysisdev/core/common/json.js'

type FormatJsonOptions = {
  project: Project
}
export function formatJson(options: FormatJsonOptions): string {
  return encodeJSON(options.project, undefined, 2)
}
