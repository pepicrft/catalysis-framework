import { eslint, app, error } from '@gestaltjs/core/cli'
type LintOptions = {
  fix: boolean
  app: app.App
}
export default async function styles(options: LintOptions) {
  const args = []
  if (options.fix) {
    args.push('--fix')
  }
  args.push(options.app.sourcesGlob)
  try {
    await eslint.run(args, options.app.directory)

    // TODO: fix error with logger when executing tests
  } catch (err) {
    throw new error.Abort('Linting failed. Check the above issues', {
      next: '',
    })
  }
}
