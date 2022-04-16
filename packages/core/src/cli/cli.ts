/**
 * Returns true if the current process has been called with either a --verbose or -v argument.
 * @returns {boolean} True if the process is running in verbose mode.
 */
export function isRunningInVerbose(argv: string[] = process.argv): boolean {
  if (argv.includes('--verbose') || argv.includes('-v')) {
    return true
  } else {
    return false
  }
}
