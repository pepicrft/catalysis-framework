import pinoPretty from 'pino-pretty'
import pino from 'pino'
import {
  formatGray,
  formatRed,
  formatMagenta,
  formatGreen,
  formatYellow,
  formatCyan,
} from '../terminal'
import { pascalCase } from '../string'

function formatLevel(level: string): string {
  let outputLevel = pascalCase(level)
  if (level === 'fatal' || level === 'error') {
    outputLevel = formatRed(outputLevel)
  } else if (level === 'silent') {
    outputLevel = formatGray(outputLevel)
  } else if (level === 'trace') {
    outputLevel = formatMagenta(outputLevel)
  } else if (level === 'debug') {
    outputLevel = formatCyan(outputLevel)
  } else if (level === 'info') {
    outputLevel = formatGreen(outputLevel)
  } else if (level === 'warn') {
    outputLevel = formatYellow(outputLevel)
  }
  return outputLevel
}
function formatModule(module: string): string {
  return formatGray(`[@gestaltjs/${module}]`)
}

export default async (options: pino.TransportBaseOptions) => {
  return pinoPretty({
    ...options,
    colorize: false,
    messageFormat: (log, messageKey) => {
      const levelLabel = formatLevel(`${log['levelLabel']}`)
      const module = formatModule(`${log['module']}`)
      return `${levelLabel} ${module} ${log[messageKey]}`
    },
    ignore: 'module,hostname,pid,time,name,level,levelLabel',
    singleLine: true,
  })
}
