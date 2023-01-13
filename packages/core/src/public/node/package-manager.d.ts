declare type FindPackageJsonUpOptions = {
  /**
   * The directory from where to look up the package.json
   */
  fromDirectory: string
}

declare type FindPackageJsonUpOutput = void

declare function findPackageJsonUp(
  options: FindPackageJsonUpOptions
): Promise<FindPackageJsonUpOptions>
