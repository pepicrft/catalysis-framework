/**
 * A type that represents a validation issue.
 */
export type ValidationIssue = {
  /** The severity of the validation.
   *    - Warning: Warning issues are output to the user but don't cause the process to abort.
   *    - Error: Error issues are output to the user and cause the process to abort.
   */
  severity: 'warning' | 'error'
  /**
   * Message describing the issue.
   */
  message: string
}
