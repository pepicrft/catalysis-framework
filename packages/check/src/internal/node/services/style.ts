import { Abort } from '@catalysisdev/core/common/error'
import { runESLint } from '@catalysisdev/core/node/eslint'
import { Project } from '@catalysisdev/core/node/project'

export type LintOptions = {
  fix: boolean
  project: Project
}

export async function checkStyle(options: LintOptions) {
  const args = []
  if (options.fix) {
    args.push('--fix')
  }
  args.push(options.project.sourcesGlob)
  try {
    await runESLint(args, `${options.project.directory.pathString}`)
  } catch (err) {
    throw new Abort('Linting failed. Check the above issues', {
      next: '',
    })
  }
}
