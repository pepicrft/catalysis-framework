import { project, terminal } from '@gestaltjs/core/cli'
import { relativizePath } from '@gestaltjs/core/node/path'

type PrettyFormatOptions = {
  project: project.models.Project
}

export function prettyFormat(options: PrettyFormatOptions): string {
  const lines: string[] = []
  lines.push(terminal.formatGreen(terminal.formatBold('Project')))
  lines.push(
    `  ${terminal.formatBold('Name:')} ${options.project.configuration.name}`
  )
  lines.push(
    `  ${terminal.formatBold('Directory:')} ${relativizePath(
      options.project.directory
    )}`
  )
  lines.push(
    `  ${terminal.formatBold('Manifest:')} ${relativizePath(
      options.project.configuration.manifestPath
    )}`
  )
  lines.push(``)
  const mainTargets = options.project.targets.main
  if (
    Object.keys(mainTargets).length !== 0 ||
    Object.keys(mainTargets).length !== 0
  ) {
    lines.push(terminal.formatGreen(terminal.formatBold('Targets 📦')))
  }
  if (Object.keys(mainTargets).length !== 0) {
    lines.push(`    ${terminal.formatCyan(terminal.formatBold('Main'))}`)
    Object.keys(mainTargets).forEach((targetName) => {
      const target = mainTargets[targetName]
      const targetPrefix = `      `
      const targetMetadataPrefix = `        `
      lines.push(
        `${targetPrefix}${terminal.formatYellow(
          terminal.formatBold(`${targetName} [${target.platforms.join(',')}]`)
        )}`
      )
      lines.push(
        `${targetMetadataPrefix}${terminal.formatBold(
          `Directory:`
        )} ${relativizePath(target.directory)}`
      )
      lines.push(
        `${targetMetadataPrefix}${terminal.formatBold(
          `Manifest:`
        )} ${relativizePath(target.manifestPath)}`
      )
    })
  }

  lines.push(``)
  return lines.join('\n')
}
