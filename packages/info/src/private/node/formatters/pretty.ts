import { Project } from '@gestaltjs/core/node/project'
import { relativizePath } from '@gestaltjs/core/node/path'
import { formatGreen, formatBold } from '@gestaltjs/core/node/terminal'

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
