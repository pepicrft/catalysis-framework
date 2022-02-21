import pino from 'pino'
import type { TransportMultiOptions } from 'pino'
import { gestalt as gestaltEnvironment } from './environment'
import { runningInVerbose } from './cli'

import { Bug } from './error'
export type LogLevel = pino.LevelWithSilent

/**
 * We cache the loggers to ensure we only have an
 * instance per module and thus use the memory efficiently.
 */
const cachedLoggers: { [key: string]: Logger } = {}

export class Logger {
  pinoLogger: pino.Logger

  constructor(pinoLogger: pino.Logger) {
    this.pinoLogger = pinoLogger
  }

  child(module: string): Logger {
    const cachedLogger = cachedLoggers[module]
    if (cachedLogger) {
      return cachedLogger
    }

    const logger = new Logger(this.pinoLogger.child({ module: module }))
    cachedLoggers[module] = logger
    return logger
  }

  success(message: string, level: LogLevel = 'info') {
    this.log(`🎉${message}`, level)
  }

  log(message: string, level: LogLevel) {
    switch (level) {
      case 'debug':
        this.pinoLogger.debug({}, message)
        break
      case 'error':
        this.pinoLogger.error({}, message)
        break
      case 'fatal':
        this.pinoLogger.fatal({}, message)
        break
      case 'info':
        this.pinoLogger.info({}, message)
        break
      case 'silent':
        this.pinoLogger.silent({}, message)
        break
      case 'trace':
        this.pinoLogger.trace({}, message)
        break
      case 'warn':
        this.pinoLogger.warn({}, message)
        break
    }
  }
}

let _gestalt: Logger | undefined

export function setupGestaltLogger(transport: TransportMultiOptions) {
  const development = gestaltEnvironment() === 'development'
  _gestalt = new Logger(
    pino({
      name: 'gestalt',
      level: runningInVerbose() ? 'debug' : 'info',
      transport: development
        ? {
            targets: [...transport.targets],
          }
        : undefined,
    })
  )
}

let _core: Logger | undefined

export function core(): Logger {
  if (_core) {
    return _core
  }
  _core = new Logger(
    pino({
      name: 'gestalt',
      level: runningInVerbose() ? 'debug' : 'info',
      transport: {
        targets: [
          {
            target: `./logger/transport.js`,
            options: {},
            level: 'debug',
          },
        ],
      },
    })
  )
  return _core
}

export function gestalt(): Logger {
  if (!_gestalt) {
    throw new Bug(
      'Gestalt is running without having initialized the default logger.',
      ''
    )
  }
  return _gestalt
}
