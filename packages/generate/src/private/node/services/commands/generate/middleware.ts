import { Project } from '@catalysisdev/core/node/project.js'

export const GENERATE_MIDDLEWARE_LANGUAGES = ['javascript', 'typescript']
export type GenerateMiddlewareLanguage =
  (typeof GENERATE_MIDDLEWARE_LANGUAGES)[number]

type GenerateMiddlewareOptions = {
  // The name of the middleware
  name: string

  // The programming language to use.
  language: GenerateMiddlewareLanguage

  // The project for which the middleware will be generated
  project: Project
}

export async function generateMiddlewareService(
  options: GenerateMiddlewareOptions
) {
  // noop
}
