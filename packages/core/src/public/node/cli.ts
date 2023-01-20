import { run, flush, settings } from '@oclif/core'
import { errorHandler } from '../node/error.js'
import cli from 'cac'

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

/**
 * A set of options to configure how the CLI is executed.
 */
type RunCLIOptions = {
  /** The URL of the module from where the CLI gets executed  */
  moduleURL: string

  /**
   * The name of the executabble. This name will be used throughout the outputs.
   */
  name: string
}

export async function runCLI(options: RunCLIOptions) {
  try {
    const catalysis = cli(options.name).help().version('0.8.0')
    catalysis.parse(process.argv, { run: false })
    await catalysis.runMatchedCommand()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  } catch (error: Error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await errorHandler(error)
  }
}
