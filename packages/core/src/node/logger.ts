import pino from 'pino'
import { isRunningInVerbose } from './cli.js'
export type LogLevel = Omit<pino.Level, 'trace' | 'fatal'>
import {
  formatYellow,
  formatGray,
  formatBold,
  formatGreen,
} from './terminal.js'
import terminalLink from 'terminal-link'
import { isRunningTests } from './environment.js'
import { LoggerContentToken, LoggerContentType } from './logger/content.js'
import { LoggerTarget, NoopLoggerTarget } from './logger/target.js'
import { relativizePath } from './path.js'

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

export type LoggerLogOptions = {
  sameProcess?: boolean
}

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
   * @param options {LoggerLogOptions} Options
   */
  error(log: ErrorLog, options: LoggerLogOptions = {}) {
    if (isRunningTests()) {
      return
    }
    this.target.error(log.error, log.message)
  }

  /**
   * Logs a debug messages.
   * @param message {LoggerMessage} Message to be logged.
   * @param object {object} Object containing contextual metadata that will be serialized when logs get serialized.
   * @param options {LoggerLogOptions} Options
   */
  debug(
    message: LoggerMessage,
    object: object = {},
    options: LoggerLogOptions = {}
  ) {
    this.log(object, formatGray(stringify(message)), 'debug', options)
  }

  /**
   * Logs info messages.
   * @param message {LoggerMessage} Message to be logged.
   * @param object {object} Object containing contextual metadata that will be serialized when logs get serialized.
   * @param options {LoggerOptions} Logging options.
   */
  info(
    message: LoggerMessage,
    object: object = {},
    options: LoggerLogOptions = {}
  ) {
    this.log(object, message, 'info', options)
  }

  /**
   * Logs info messages without additional formatting.
   * @param message {LoggerMessage} Message to be logged.
   * @param object {object} Object containing contextual metadata that will be serialized when logs get serialized.
   * @param options {LoggerOptions} Logging options.
   */
  rawInfo(
    message: LoggerMessage,
    object: object = {},
    options: LoggerLogOptions = {}
  ) {
    this.log({ ...object, raw: true }, message, 'info', options)
  }

  /**
   * Logs warn messages.
   * @param message {LoggerMessage} Message to be logged.
   * @param object {object} Object containing contextual metadata that will be serialized when logs get serialized.
   * @param options {LoggerOptions} Logging options.
   */
  warn(
    message: LoggerMessage,
    object: object = {},
    options: LoggerLogOptions = {}
  ) {
    this.log(object, message, 'warn', options)
  }

  /**
   * Outputs the given message to the user.
   * @param message {LoggerMessage} The message to output.
   * @param level {LogLevel} The log level of the message.
   * @param options {LoggerOptions} Logging options.
   */
  private log(
    object: object,
    message: LoggerMessage,
    level: LogLevel = 'info',
    options: LoggerLogOptions = {}
  ) {
    const stringifiedMessage = stringify(message)
    switch (level) {
      case 'debug':
        if (options.sameProcess) {
          // eslint-disable-next-line no-console
          console.log(stringifiedMessage)
        } else {
          this.target.debug(object, stringifiedMessage)
        }
        break
      case 'error':
        if (options.sameProcess) {
          // eslint-disable-next-line no-console
          console.error(stringifiedMessage)
        } else {
          this.target.error(object, stringifiedMessage)
        }
        break
      case 'info':
        if (options.sameProcess) {
          // eslint-disable-next-line no-console
          console.info(stringifiedMessage)
        } else {
          this.target.info(object, stringifiedMessage)
        }
        break
      case 'warn':
        if (options.sameProcess) {
          // eslint-disable-next-line no-console
          console.warn(stringifiedMessage)
        } else {
          this.target.warn(object, stringifiedMessage)
        }
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

export function chooseDirectoryToken(path: string): LoggerContentToken {
  return new LoggerContentToken(path, {}, LoggerContentType.ChooseDirectory)
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

type ContextBoxType = 'success'

export function contentBox(
  type: ContextBoxType,
  header: LoggerMessage,
  body: LoggerMessage,
  footer: LoggerMessage
): LoggerMessage {
  let output = `\n`
  if (type === 'success') {
    output = output += `${formatBold(
      formatGreen(`Success: ${stringify(header)}`)
    )}\n`
  }

  output =
    output +
    `
${stringify(body)
  .split('\n')
  .map((line) => `  ${line.trim()}`)
  .join('\n')}
  `
  if (footer) {
    output = output + `\n${formatGray(stringify(footer))}`
  }

  return output
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
        case LoggerContentType.ChooseDirectory:
          output += formatBold(
            formatYellow(`cd ${relativizePath(enumToken.value)}`)
          )
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
