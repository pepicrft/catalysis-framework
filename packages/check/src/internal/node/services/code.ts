import { Abort } from '@catalysisdev/core/common/error.js'
import { AbsolutePath } from '@catalysisdev/core/node/path.js'
import { runTypescriptCompiler } from '@catalysisdev/core/node/tsc.js'

export async function checkCode(directory: AbsolutePath) {
  try {
    await runTypescriptCompiler(['--noEmit'], `${directory.pathString}`)
  } catch (err) {
    throw new Abort('Typescript compiler failed. Check the above issues', {
      next: '',
    })
  }
}
