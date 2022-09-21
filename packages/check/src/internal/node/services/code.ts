import { Abort } from '@gestaltjs/core/common/error'
import { runTypescriptCompiler } from '@gestaltjs/core/node/tsc'

export async function checkCode(directory: string) {
  try {
    await runTypescriptCompiler(['--noEmit'], directory)
    // TODO: fix error with logger when executing tests
  } catch (err) {
    throw new Abort('Typescript compiler failed. Check the above issues', {
      next: '',
    })
  }
}
