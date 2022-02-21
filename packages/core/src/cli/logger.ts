import pino from 'pino'
import { runningInVerbose } from './cli'
import { gestalt as gestaltEnvironment, isRunningTests } from './environment'

export type LogLevel = pino.LevelWithSilent

export class Logger {
  pinoLogger: pino.Logger

  constructor(pinoLogger: pino.Logger) {
    this.pinoLogger = pinoLogger
  }

  child(module: string): Logger {
    return new Logger(this.pinoLogger.child({ module: module }))
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

const development = gestaltEnvironment() === 'development'

export const gestalt = new Logger(
  pino({
    name: 'gestalt',
    level: runningInVerbose() ? 'debug' : 'info',
    transport:
      development && !isRunningTests()
        ? {
            target: './logger/base-transport.mjs',
          }
        : undefined,
  })
)
export const core = gestalt.child('core')
