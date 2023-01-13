import { Abort } from '@catalysisdev/core/common/error'
import { AbsolutePath } from '@catalysisdev/core/node/path'
import { runTypescriptCompiler } from '@catalysisdev/core/node/tsc'

export async function checkCode(directory: AbsolutePath) {
  try {
    await runTypescriptCompiler(['--noEmit'], `${directory.pathString}`)
    // TODO: fix error with logger when executing tests
  } catch (err) {
    throw new Abort('Typescript compiler failed. Check the above issues', {
      next: '',
    })
  }
}
