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
import build from 'pino-abstract-transport'
import { Transform } from 'node:stream'

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

/**
 * Returns a transport that filters log events based on module name.
 * Only the logs that have the same module name as the given one will be passed
 * through the given transporter
 *
 * @param module {string} Name of the module where the transporter will be used.
 * @param transport {Transform} Transporter to pass through if the logs are for the given module.
 * @returns {Promise<Transform>} A promise that resolves with the Transform
 */
export async function moduleTransport(
  module: string,
  transport: Transform
): Promise<Transform> {
  return build(function (source) {
    source.on('data', function (obj) {
      if (obj.module === module) {
        transport.emit('data', obj)
      }
    })
    source.on('close', () => {
      transport.emit('close')
    })
  })
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
