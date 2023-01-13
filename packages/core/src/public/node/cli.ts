import { run, flush, settings } from '@oclif/core'
import { errorHandler } from '../node/error.js'
import { Command } from 'commander'

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

type RunCLIOptions = {
  moduleURL: string
}

export function runCLI(options: RunCLIOptions) {
  const cli = new Command()
  cli
    .name('catalysis')
    .description('A full-stack web framework for Javascript')
    .version('0.8.0')
}

/**
 * A set of options for running an oclif-based CLI
 */
type RunOclifCLIOptions = {
  moduleURL: string
}

/**
 * It returns a function to invoke a CLI through oclif.
 * It ensures that errors that bubble up from the execution are handled using
 * @catalysisdev/core's error handler.
 * @param options {RunOclifCLIOptions} Options
 * @returns {() => ()} A function to run the CLI.
 */
export function runOclifCLI(options: RunOclifCLIOptions) {
  const isDebug = process.env.DEBUG === '1'
  settings.debug = isDebug

  return async () => {
    await run(void 0, options.moduleURL)
      .then(async (ms) => {
        await flush(ms as number)
      })
      .catch((thrownError) => {
        return errorHandler(thrownError as Error)
      })
  }
}

/**
 * A set of options for running a create-* CLI
 */
type RunOclifInitCLIOptions = RunOclifCLIOptions & {
  /**
   * The name of the init CLI including the "create-" prefix (e.g. create-project)
   */
  name: string
}

/**
 * It invokes a create-* CLI. Unlike the runOclifCLI function, it adjusts
 * the process.argv to force the only init command to execute by default.
 * @param options {RunOclifInitCLIOptions} Options.
 * @returns {() => ()} A function to run the CLI.
 */
export function runOclifInitCLI(options: RunOclifInitCLIOptions) {
  const initIndex = process.argv.findIndex((arg) => arg.includes('init'))
  if (initIndex === -1) {
    const initIndex =
      process.argv.findIndex(
        (arg) =>
          arg.includes(`bin/${options.name}`) ||
          arg.includes('bin/dev') ||
          arg.includes('bin/run')
      ) + 1
    process.argv.splice(initIndex, 0, 'init')
  }
  return runOclifCLI(options)
}
