import type { AbsolutePath } from './path.js'

export declare type FindPackageJsonUpOptions = {
  /**
   * The directory from where to look up the package.json
   */
  fromDirectory: AbsolutePath
}

export declare type FindPackageJsonUpOutput = void

export declare function findPackageJsonUp(
  options: FindPackageJsonUpOptions
): Promise<FindPackageJsonUpOutput>
