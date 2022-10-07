export type LoggerMessage = string | LoggerTokenizedString

export type ErrorLogType = 'bug' | 'abort' | 'unhandled'

/**
 * It's used as a key to identify the token in a templated log.
 */
export enum LoggerContentType {
  Command,
  ChooseDirectory,
  Path,
  File,
  Url,
}

/**
 * It represents metadata that's attached to the token unit.
 */
export interface LoggerContentMetadata {
  url?: string
}

/**
 * It represents a semantic unit within a log.
 * The semantic meaning is used to vary the formatting.
 */
export class LoggerContentToken {
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
export class LoggerTokenizedString {
  value: string
  constructor(value: string) {
    this.value = value
  }
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
