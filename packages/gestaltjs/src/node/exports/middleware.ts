import { Request, Response } from '@gestaltjs/core/common/fetch'

type Middleware =
  | ((request: Request) => Promise<Response>)
  | ((request: Request) => Response)

export { Request, Response }

/**
 * A utility function to define a middleware. Since the function has its argument and
 * return value typed, when using it from the configuration default module, editors will
 * offer a better editing experience with syntax highlighting, validation, documentation,
 * and auto-completion.
 *
 * @param configuration {(request: Request) => Promise<Response> | (request: Request) => Response} Define a new middlware.
 * @returns A promise that resolves with the middlware.
 */
export function defineMiddleware(middleware: Middleware): Middleware {
  return middleware
}
