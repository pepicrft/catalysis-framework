import { Project } from '@catalysisdev/core/node/project'
import { encodeJSON } from '@catalysisdev/core/common/json'

type FormatJsonOptions = {
  project: Project
}
export function formatJson(options: FormatJsonOptions): string {
  return encodeJSON(options.project, undefined, 2)
}
