import pino from 'pino'
import { isRunningInVerbose } from './cli'
export type LogLevel = Omit<pino.Level, 'trace' | 'fatal'>
import { formatYellow, formatGray, formatBold } from './terminal'
import terminalLink from 'terminal-link'
import { isRunningTests } from './environment'
import { LoggerContentToken, LoggerContentType } from './logger/content'
import { LoggerTarget, NoopLoggerTarget } from './logger/target'
import { relativizePath } from '../node/path.public'

/**
 * We cache the loggers to ensure we only have an
 * instance per module and thus use the memory efficiently.
 */
const cachedLoggers: { [key: string]: Logger } = {}

export type ErrorLogType = 'bug' | 'abort' | 'unhandled'

/**
 * It defines the type of an error log.
 */
export type ErrorLog = {
  type: ErrorLogType
  message: string
  error: object
}

/**
 * It represents a string that's been generated from a tokenized string.
 */
class LoggerTokenizedString {
  value: string
  constructor(value: string) {
    this.value = value
  }
}

export type LoggerMessage = string | LoggerTokenizedString

export class Logger {
  target: LoggerTarget

  constructor(target: LoggerTarget) {
    this.target = target
  }

  child(module: string): Logger {
    const cachedLogger = cachedLoggers[module]
    if (cachedLogger) {
      return cachedLogger
    }

    const logger = new Logger(this.target.child({ module: module }))
    cachedLoggers[module] = logger
    return logger
  }

  /**
   * Outputs a success message to the user.
   * @param message {LoggerMessage} The successful message.
   * @param level {LogLevel} The log level of the message.
   * @param object {object} Object containing contextual metadata that will be serialized when logs get serialized.
   */
  success(
    message: LoggerMessage,
    level: LogLevel = 'info',
    object: object = {}
  ) {
    this.log(object, `🎉 ${stringify(message)}`, level)
  }

  /**
   * Logs an error.
   * @param log {ErrorLog} Error log
   */
  error(log: ErrorLog) {
    if (isRunningTests()) {
      return
    }
    this.target.error(log.error, log.message)
  }

  /**
   * Logs a debug messages.
   * @param message {LoggerMessage} Message to be logged.
   * @param object {object} Object containing contextual metadata that will be serialized when logs get serialized.
   */
  debug(message: LoggerMessage, object: object = {}) {
    this.log(object, formatGray(stringify(message)), 'debug')
  }

  /**
   * Logs info messages.
   * @param message {LoggerMessage} Message to be logged.
   * @param object {object} Object containing contextual metadata that will be serialized when logs get serialized.
   */
  info(message: LoggerMessage, object: object = {}) {
    this.log(object, message, 'info')
  }

  /**
   * Logs info messages without additional formatting.
   * @param message {LoggerMessage} Message to be logged.
   * @param object {object} Object containing contextual metadata that will be serialized when logs get serialized.
   */
  rawInfo(message: LoggerMessage, object: object = {}) {
    this.log({ ...object, raw: true }, message, 'info')
  }

  /**
   * Logs warn messages.
   * @param message {LoggerMessage} Message to be logged.
   * @param object {object} Object containing contextual metadata that will be serialized when logs get serialized.
   */
  warn(message: LoggerMessage, object: object = {}) {
    this.log(object, message, 'warn')
  }

  /**
   * Outputs the given message to the user.
   * @param message {LoggerMessage} The message to output.
   * @param level {LogLevel} The log level of the message.
   */
  private log(
    object: object,
    message: LoggerMessage,
    level: LogLevel = 'info'
  ) {
    if (isRunningTests()) {
      return
    }
    switch (level) {
      case 'debug':
        this.target.debug(object, stringify(message))
        break
      case 'error':
        this.target.error(object, stringify(message))
        break
      case 'info':
        this.target.info(object, stringify(message))
        break
      case 'warn':
        this.target.warn(object, stringify(message))
        break
    }
  }
}

/**
 * Returns a token that represents a command.
 * @param value {string} The command (including its arguments)
 * @returns {LoggerContentToken} A token that represents a command.
 */
export function commandToken(value: string): LoggerContentToken {
  return new LoggerContentToken(value, {}, LoggerContentType.Command)
}

/**
 * It returns a token that represents a path to a directory or to a file.
 * @param value {string} The path (either to a directory or a file)
 * @returns {LoggerContentToken} A token that represents a path.
 */
export function pathToken(value: string): LoggerContentToken {
  return new LoggerContentToken(value, {}, LoggerContentType.Path)
}

/**
 * It returns a token that represents a file name.
 * @param value {string} The file name.
 * @returns {LoggerContentToken} A token that represents a file name.
 */
export function fileToken(value: string): LoggerContentToken {
  return new LoggerContentToken(value, {}, LoggerContentType.File)
}

/**
 * It returns a token that represents a URL. In terminals that support it,
 * The name of the link is used instead of the full URL.
 * @param value {string} The name of the link
 * @param url {string} The URL of the link
 * @returns {LoggerContentToken} A token that represents a URL.
 */
export function urlToken(value: string, url: string): LoggerContentToken {
  return new LoggerContentToken(value, { url }, LoggerContentType.Url)
}

/**
 * Given a LoggerMessage instance, it returns a string representing it.
 * @param message {LoggerMessage} Either a tokenized content or a string.
 * @returns A string representing the content.
 */
export function stringify(content: LoggerMessage): string {
  if (content instanceof LoggerTokenizedString) {
    return content.value
  } else {
    return content
  }
}

/**
 * A template-literal function that initializes a tokenized logger
 * message.
 * @returns LoggerTokenizedString
 */
export function content(
  strings: TemplateStringsArray,
  ...keys: (LoggerContentToken | string)[]
): LoggerTokenizedString {
  let output = ``
  strings.forEach((string, i) => {
    output += string
    if (i >= keys.length) {
      return
    }
    const token = keys[i]
    if (typeof token === 'string') {
      output += token
    } else {
      const enumToken = token as LoggerContentToken
      switch (enumToken.type) {
        case LoggerContentType.Path:
          output += formatGray(relativizePath(enumToken.value))
          break
        case LoggerContentType.File:
          output += formatGray(enumToken.value)
          break
        case LoggerContentType.Command:
          output += formatBold(formatYellow(enumToken.value))
          break
        case LoggerContentType.Url:
          output += terminalLink(enumToken.value, enumToken.metadata.url ?? '')
          break
      }
    }
  })
  return new LoggerTokenizedString(output)
}

let _core: Logger | undefined

export function coreLogger(): Logger {
  if (_core) {
    return _core
  }
  // NoopLoggerTarget
  let target: LoggerTarget
  if (isRunningTests()) {
    target = new NoopLoggerTarget()
  } else {
    target = pino({
      name: 'gestalt',
      level: isRunningInVerbose() ? 'debug' : 'info',
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
  }
  _core = new Logger(target).child('core')
  return _core
}
