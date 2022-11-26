import { inTemporarydirectory } from '../../../../internal/node/testing/temporary'
import { AbsolutePath } from '../../../../public/node/path.js'
import {
  BuildAndLoadModuleError,
  BaseCompiler,
  ModuleCompilationError,
} from '../compiler.js'
import { build as esbuild } from 'esbuild'
import { configurationFilenameWithoutExtension } from '../../../../internal/common/constants'
import {
  Result,
  AsyncResult,
  Ok,
  Err,
} from '../../../../public/common/result.js'
import { Abort } from '../../../../public/common/error.js'

export class ESBuildBaseCompiler implements BaseCompiler {
  async buildAndLoadModule(
    path: AbsolutePath
  ): AsyncResult<any, BuildAndLoadModuleError> {
    let result: Result<any, BuildAndLoadModuleError>
    await inTemporarydirectory(async (tmpDirectory) => {
      const outputModulePath = tmpDirectory.pathAppendingComponent(
        `${configurationFilenameWithoutExtension}.js`
      )
      try {
        await esbuild({
          entryPoints: [path.pathString],
          bundle: false,
          outfile: outputModulePath.pathString,
          logLevel: 'silent',
        })
        result = Ok(await import(outputModulePath.pathString))
      } catch (_error) {
        if (_error instanceof Error) {
          const error = new ModuleCompilationError(_error.message)
          error.stack = _error.stack
          result = Err(error)
        } else {
          result = Err(
            new Abort(
              `Unknown error building and loading a module with ESBuild: ${_error}`
            )
          )
        }
      }
    })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return result
  }
}
