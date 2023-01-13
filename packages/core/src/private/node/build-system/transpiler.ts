import { AbsolutePath } from 'typed-file-system-path'
import { AsyncResult, Err, Ok, Result } from '../../../public/common/result.js'
import { Abort, ExtendableError } from '../../../public/common/error.js'
import { ESBuildBaseTranspiler } from './transpiler/esbuild.js'
import { inTemporarydirectory } from '../../../public/node/fs.js'

export class ModuleTranspilationError extends ExtendableError {}
export type BuildAndLoadModuleError = ModuleTranspilationError | Abort

type BaseTranspilerConstructor = new (...args: any[]) => BaseTranspiler

export function Transpiler<TBase extends BaseTranspilerConstructor>(
  Base: TBase
) {
  return class Transpiling extends Base {
    /**
     * Given a path to a module, it builds it into a temporary
     * directory, loads it, and returns the temporary directory
     * before deleting the module.
     * @param path
     */
    async buildAndImportModule(
      filePath: AbsolutePath
    ): AsyncResult<any, BuildAndLoadModuleError> {
      let result: Result<any, BuildAndLoadModuleError>
      await inTemporarydirectory(async (tmpDir) => {
        const outputPath = tmpDir.pathAppendingComponent('output.js')
        try {
          await this.transpile(filePath, outputPath)
          result = Ok(await import(outputPath.pathString))
        } catch (_error: any) {
          if (_error instanceof Error) {
            const error = new ModuleTranspilationError(_error.message)
            error.stack = _error.stack
            result = Err(error)
          } else {
            result = Err(
              new Abort(
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                `Unknown error building and loading a module with ESBuild: ${_error}`
              )
            )
          }
        }
      })
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return Promise.resolve(result)
    }
  }
}

/**
 * A transpiler that uses ESBuild internally to transpile modules.
 */
export const ESBuildTranspiler = Transpiler(ESBuildBaseTranspiler)

/**
 * This interface describes the interface a transpiler that can transform
 * and bundle Javascript and supersets of Javascript (e.g. Typescript).
 * The interface decouples the build tool from the build system. The
 * latter is owned by Catalysis to be able to provide optimizations and
 * features that are not provided by the runtime, for example module
 * hot-reloading.
 */
export interface BaseTranspiler {
  transpile(inputPath: AbsolutePath, outputPath: AbsolutePath): Promise<void>
}
