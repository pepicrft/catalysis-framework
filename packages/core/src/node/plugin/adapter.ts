export type SaveFileOptions = {
  /** The path represented by the page */
  urlPath: string

  /** The file content */
  content: string

  /** The directory in which the user would like to output the build */
  outputDirectory: string
}

export type BuildCompleteOptions = {
  /** The directory in which the user would like to output the build */
  outputDirectory: string
}

export type RequestHandlerOptions = {
  /**
   * The id of the module that default exports an h3-based
   * middleware to be adapted.
   */
  middlewareModuleId: string
}

export type RequestHandlerOutput = {
  /**
   *
   */
  aliases: { find: string; replace: string }[]
  // Nothing yet
}

export type UserAdapter = {
  requestHandler: (
    options: RequestHandlerOptions
  ) => Promise<RequestHandlerOutput>

  /**
   * This hook is invoked for every output file and should be used
   * to store the files in the output directory.
   */
  saveFile?: (options: SaveFileOptions) => Promise<void>

  /**
   * This hook is invoked when the build is complete and can be used
   * for running additional steps before completing the build. For example,
   * for creating a Netlify manifest file.
   */
  buildComplete?: (options: BuildCompleteOptions) => Promise<void>
}
