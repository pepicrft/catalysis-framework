import pino from 'pino'
import { isRunningInVerbose } from './cli'
export type LogLevel = Omit<pino.Level, 'trace' | 'fatal'>
import { formatYellow, formatItalic, formatBold } from './terminal'
import terminalLink from 'terminal-link'
import { isRunningTests } from './environment'

/**
 * We cache the loggers to ensure we only have an
 * instance per module and thus use the memory efficiently.
 */
const cachedLoggers: { [key: string]: Logger } = {}

/**
 * It's used as a key to identify the token in a templated log.
 */
enum LoggerContentType {
  Command,
  Path,
  Url,
}

/**
 * It represents metadata that's attached to the token unit.
 */
interface LoggerContentMetadata {
  url?: string
}

/**
 * It represents a semantic unit within a log.
 * The semantic meaning is used to vary the formatting.
 */
class LoggerContentToken {
  /** Token type */
  type: LoggerContentType
  /** String value */
  value: string
  /** Metadata attached to the token. */
  metadata: LoggerContentMetadata

  constructor(
    value: string,
    metadata: LoggerContentMetadata = {},
    type: LoggerContentType
  ) {
    this.type = type
    this.value = value
    this.metadata = metadata
  }
}

export type ErrorLogType = 'bug' | 'abort' | 'unhandled'

/**
 * It defines the type of an error log.
 */
export type ErrorLog = {
  type: ErrorLogType
  message: string
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

type LoggerMessage = string | LoggerTokenizedString

/**
 * A logger target abstracts away the destination of the logs.
 * This is useful for unit tests where we don't want to log through
 * the Pino stack.
 */
interface LoggerTarget {
  child(options: { module: string }): LoggerTarget
  error(object: any, message: string): any
  debug(object: any, message: string): any
  info(object: any, message: string): any
  warn(object: any, message: string): any
}

/**
 * A logger target that does nothing with the logs.
 */
class NoopLoggerTarget implements LoggerTarget {
  child(options: { module: string }): LoggerTarget {
    return this
  }

  error(object: any, message: string): any {
    // noop
  }
  debug(object: any, message: string): any {
    // noop
  }
  info(object: any, message: string): any {
    // noop
  }
  warn(object: any, message: string): any {
    // noop
  }
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
   */
  success(message: LoggerMessage, level: LogLevel = 'info') {
    this.log(`🎉 ${this.stringify(message)}`, level)
  }

  /**
   * Logs an error.
   * @param log {ErrorLog} Error log
   */
  error(log: ErrorLog) {
    if (isRunningTests()) {
      return
    }
    this.target.error(log, log.message)
  }

  /**
   * Logs a debug messages.
   * @param message {LoggerMessage} Message to be logged.
   */
  debug(message: LoggerMessage) {
    this.log(message, 'debug')
  }

  /**
   * Logs info messages.
   * @param message {LoggerMessage} Message to be logged.
   */
  info(message: LoggerMessage) {
    this.log(message, 'info')
  }

  /**
   * Logs warn messages.
   * @param message {LoggerMessage} Message to be logged.
   */
  warn(message: LoggerMessage) {
    this.log(message, 'warn')
  }

  /**
   * Outputs the given message to the user.
   * @param message {LoggerMessage} The message to output.
   * @param level {LogLevel} The log level of the message.
   */
  private log(message: LoggerMessage, level: LogLevel = 'info') {
    if (isRunningTests()) {
      return
    }
    switch (level) {
      case 'debug':
        this.target.debug({}, this.stringify(message))
        break
      case 'error':
        this.target.error({}, this.stringify(message))
        break
      case 'info':
        this.target.info({}, this.stringify(message))
        break
      case 'warn':
        this.target.warn({}, this.stringify(message))
        break
    }
  }

  /**
   * Returns a token that represents a command.
   * @param value {string} The command (including its arguments)
   * @returns {LoggerContentToken} A token that represents a command.
   */
  command(value: string): LoggerContentToken {
    return new LoggerContentToken(value, {}, LoggerContentType.Command)
  }

  /**
   * It returns a token that represents a path to a directory or to a file.
   * @param value {string} The path (either to a directory or a file)
   * @returns {LoggerContentToken} A token that represents a path.
   */
  path(value: string): LoggerContentToken {
    return new LoggerContentToken(value, {}, LoggerContentType.Path)
  }

  /**
   * It returns a token that represents a URL. In terminals that support it,
   * The name of the link is used instead of the full URL.
   * @param value {string} The name of the link
   * @param url {string} The URL of the link
   * @returns {LoggerContentToken} A token that represents a URL.
   */
  url(value: string, url: string): LoggerContentToken {
    return new LoggerContentToken(value, { url }, LoggerContentType.Url)
  }

  /**
   * A template-literal function that initializes a tokenized logger
   * message.
   * @returns LoggerTokenizedString
   */
  content(
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
            output += formatItalic(enumToken.value)
            break
          case LoggerContentType.Command:
            output += formatBold(formatYellow(enumToken.value))
            break
          case LoggerContentType.Url:
            output += terminalLink(
              enumToken.value,
              enumToken.metadata.url ?? ''
            )
            break
        }
      }
    })
    return new LoggerTokenizedString(output)
  }

  private stringify(message: LoggerMessage): string {
    if (message instanceof LoggerTokenizedString) {
      return message.value
    } else {
      return message
    }
  }
}

let _core: Logger | undefined

export function core(): Logger {
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
