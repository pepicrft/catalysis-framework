import { AbsolutePath } from 'typed-file-system-path'
import { AsyncResult } from '../../../public/common/result.js'
import { Abort, ExtendableError } from '../../../public/common/error.js'
import { ESBuildBaseCompiler } from './compiler/esbuild.js'

export class ModuleCompilationError extends ExtendableError {}
export type BuildAndLoadModuleError = ModuleCompilationError | Abort
type BaseCompilerConstructor = new (...args: any[]) => BaseCompiler

export function Compiler<TBase extends BaseCompilerConstructor>(Base: TBase) {
  return class Compiling extends Base {}
}

export const ESBuildCompiler = Compiler(ESBuildBaseCompiler)

/**
 * This interface describes the interface a compiler that can transform
 * and bundle Javascript and supersets of Javascript (e.g. Typescript).
 * The interface decouples the build tool from the build system. The
 * latter is owned by Gestalt to be able to provide optimizations and
 * features that are not provided by the runtime, for example module
 * hot-reloading.
 */
export interface BaseCompiler {
  /**
   * Given a path to a module, it builds it into a temporary
   * directory, loads it, and returns the temporary directory
   * before deleting the module.
   * @param path
   */
  buildAndLoadModule(
    path: AbsolutePath
  ): AsyncResult<any, BuildAndLoadModuleError>
}
