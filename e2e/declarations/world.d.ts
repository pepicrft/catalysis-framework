declare interface GestaltWorld {
  temporaryDirectory: string
  temporaryEnvironment: any | undefined
  projectDirectory: string | undefined

  runGestalt(args: string[], options: RunOptions = {}): Promise<void>
  runCreateProject(args: string[], options: RunOptions = {}): Promise<void>
}
