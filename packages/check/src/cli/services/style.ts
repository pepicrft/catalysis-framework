import { project } from '@gestaltjs/core/cli'
import { Abort } from '@gestaltjs/core/common/error'
import { runESLint } from '@gestaltjs/core/node/eslint'

export type LintOptions = {
  fix: boolean
  project: project.models.Project
}

export async function checkStyle(options: LintOptions) {
  const args = []
  if (options.fix) {
    args.push('--fix')
  }
  args.push(options.project.sourcesGlob)
  try {
    await runESLint(args, options.project.directory)

    // TODO: fix error with logger when executing tests
  } catch (err) {
    throw new Abort('Linting failed. Check the above issues', {
      next: '',
    })
  }
}
