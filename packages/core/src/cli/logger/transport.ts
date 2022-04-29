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

const pinoLogLevels: { [key: number]: string } = {
  10: 'trace',
  20: 'debug',
  30: 'info',
  40: 'warn',
  50: 'error',
  60: 'fatal',
}

// eslint-disable-next-line import/no-default-export
const baseTransport = (options: pino.TransportBaseOptions) => {
  return pinoPretty({
    ...options,
    sync: true,
    colorize: false,
    messageFormat: (log, messageKey) => {
      const isRaw = log['raw']
      const module = formatModule(`${log['module']}`)
      const level = pinoLogLevels[log.level as number]
      const message = log[messageKey] as string

      if (isRaw) {
        return message
      } else if (level) {
        const levelLabel = formatLevel(`${level}`)
        const prefix = `${levelLabel} ${module}:`
        return message
          .split('\n')
          .map((line) => {
            return `${prefix} ${line}`
          })
          .join('\n')
      } else {
        return message
          .split('\n')
          .map((line) => {
            return `${module} ${line}`
          })
          .join('\n')
      }
    },
    ignore: 'module,hostname,pid,time,name,level,levelLabel',
    hideObject: true,
  })
}

// eslint-disable-next-line import/no-default-export
export default baseTransport
