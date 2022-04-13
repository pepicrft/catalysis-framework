import { eslint, project, error } from '@gestaltjs/core/cli'
type LintOptions = {
  fix: boolean
  project: project.Project
}
export default async function styles(options: LintOptions) {
  const args = []
  if (options.fix) {
    args.push('--fix')
  }
  args.push(options.project.sourcesGlob)
  try {
    await eslint.run(args, options.project.directory)

    // TODO: fix error with logger when executing tests
  } catch (err) {
    throw new error.Abort('Linting failed. Check the above issues', {
      next: '',
    })
  }
}
