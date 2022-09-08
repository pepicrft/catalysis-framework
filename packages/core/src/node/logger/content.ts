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
