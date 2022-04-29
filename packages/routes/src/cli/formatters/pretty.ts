import { project, terminal } from '@gestaltjs/core/cli'
import { path } from '@gestaltjs/core/cli'

export function prettyFormat(project: project.Project): string {
  const lines: string[] = []
  lines.push(terminal.formatGreen(terminal.formatBold('Project')))
  lines.push(`  ${terminal.formatBold('Name:')} ${project.configuration.name}`)
  lines.push(
    `  ${terminal.formatBold('Directory:')} ${path.relativize(
      project.directory
    )}`
  )
  lines.push(
    `  ${terminal.formatBold('Manifest:')} ${path.relativize(
      project.configuration.manifestPath
    )}`
  )
  lines.push(``)
  const mainTargets = project.targetsGraph.targets.main
  const sharedTargets = project.targetsGraph.targets.shared
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
        )} ${path.relativize(target.directory)}`
      )
      lines.push(
        `${targetMetadataPrefix}${terminal.formatBold(
          `Manifest:`
        )} ${path.relativize(target.manifestPath)}`
      )
    })
  }

  lines.push(``)
  return lines.join('\n')
}
