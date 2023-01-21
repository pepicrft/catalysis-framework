import { Project } from '@catalysisdev/core/node/project.js'
import { relativizePath } from '@catalysisdev/core/node/path.js'
import { formatGreen, formatBold } from '@catalysisdev/core/node/terminal.js'

type PrettyFormatOptions = {
  project: Project
}

export function prettyFormat(options: PrettyFormatOptions): string {
  const lines: string[] = []
  lines.push(formatGreen(formatBold('Project')))
  lines.push(`  ${formatBold('Name:')} ${options.project.configuration.name}`)
  lines.push(
    `  ${formatBold('Directory:')} ${relativizePath(options.project.directory)}`
  )
  lines.push(
    `  ${formatBold('Manifest:')} ${relativizePath(
      options.project.configuration.path
    )}`
  )

  lines.push(``)
  return lines.join('\n')
}
