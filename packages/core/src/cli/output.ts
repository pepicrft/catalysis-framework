/**
 * Formats a successfull message and forwards it through the standard output.
 * @param message {string} Success message
 */
export function success(message: string) {
  console.log(`🎉${message}`)
}

/**
 * Forwards the given message through the standard output.
 * @param message {string} Message to output to the user
 */
export function message(message: string) {
  console.log(message)
}
