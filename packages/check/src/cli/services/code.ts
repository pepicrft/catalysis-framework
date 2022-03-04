import { tsc, error } from '@gestaltjs/core/cli'
export default async function code(directory: string) {
  try {
    await tsc.run(['--noEmit'], directory)
    // TODO: fix error with logger when executing tests
  } catch (err) {
    throw new error.Abort(
      'Typescript compiler failed. Check the above issues',
      { next: '' }
    )
  }
}
