import pino from 'pino'
import type { TransportMultiOptions } from 'pino'
import { gestalt as gestaltEnvironment } from './environment'
import { runningInVerbose } from './cli'
import { Bug } from './error'
export type LogLevel = pino.LevelWithSilent
import { formatYellow, formatItalic, formatBold } from './terminal'
import terminalLink from 'terminal-link'

/**
 * We cache the loggers to ensure we only have an
 * instance per module and thus use the memory efficiently.
 */
const cachedLoggers: { [key: string]: Logger } = {}

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

  /**
   * Outputs a success message to the user.
   * @param message {LoggerMessage} The successful message.
   * @param level {LogLevel} The log level of the message.
   */
  success(message: LoggerMessage, level: LogLevel = 'info') {
    this.log(`🎉 ${this.stringify(message)}`, level)
  }

  /**
   * Outputs the given message to the user.
   * @param message {LoggerMessage} The message to output.
   * @param level {LogLevel} The log level of the message.
   */
  log(message: LoggerMessage, level: LogLevel = 'info') {
    switch (level) {
      case 'debug':
        this.pinoLogger.debug({}, this.stringify(message))
        break
      case 'error':
        this.pinoLogger.error({}, this.stringify(message))
        break
      case 'fatal':
        this.pinoLogger.fatal({}, this.stringify(message))
        break
      case 'info':
        this.pinoLogger.info({}, this.stringify(message))
        break
      case 'silent':
        this.pinoLogger.silent({}, this.stringify(message))
        break
      case 'trace':
        this.pinoLogger.trace({}, this.stringify(message))
        break
      case 'warn':
        this.pinoLogger.warn({}, this.stringify(message))
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
  _core = new Logger(
    pino({
      name: 'gestalt',
      formatters: {
        level(label, number) {
          return { level: number, levelLabel: label }
        },
      },
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
