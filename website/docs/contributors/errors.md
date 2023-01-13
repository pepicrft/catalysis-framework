# Error handling

Errors can happen and will happen; therefore, we should account for error scenarios when writing code. Try to follow conventions and patterns that make error scenarios impossible to reach. For example, use pure functions, classes, and modules free of side effects. Unfortunately, we can't eliminate error scenarios because there might be bugs introduced by us or environment configurations we didn't design for. For example, when running code that depends on an Internet connection in a system that doesn't have a connection. The chance is that we didn't think about that, and users will get a non-actionable stack trace. Bad errors ruin the developer experience. But what makes good errors? Let's dive into a set of principles that Catalysis errors must embrace.

:::tip Let it fail
Handling errors gracefully requires iteration. Don't try to anticipate all possible scenarios. Instead, handle the obvious ones and iterate with reported errors and bugs.
:::

## Principles

The following list contains principles that we recommend embracing when devising errors:

- **Clear:** It should answer a straightforward question: *What happened?* We need to make an effort to understand errors to explain them to users in plain words. If errors are coming from third-party dependencies, the errors that we get from them are not self-descriptive. Translate them into the users' language.
- **Actionable:** When users get an error, they want to know what to do next. In scenarios where we know what to do next, for example, when they are trying to run a CLI command outside of a Catalysis project, we should provide a set of next steps they can follow. If we leave users with no actions, the action that they'll most likely take will be opening GitHub issues, which increases our support load.

## Types

### Result

There are scenarios where the caller of a function might want to get notified about failures to handle them.
For example, auto-retry HTTP requests that fail with a 5xx status code. Those functions should wrap errors
in the `Result` type from the module `@catalysisdev/core/common/result` like shown in the example below:

```ts
// http.ts
import { Err } from "@catalysisdev/core/common/result"
import { ExtendableError } from "@catalysisdev/core/common/error"

// Errors
class HTTPServerError extends ExtendableError {}
class BearerTokenNotFoundError extends ExtendableError {}

// Asynchronous result
export async function fetch<T>(url: string): AsyncResult<T, HTTPServerError> {
    return Err(new HTTPServerError())
}

// Synchronous result
export function getBearerToken(): Result<string, TokenNotFoundError> {
    return Err(new BearerTokenNotFoundError())
}
```


### Abort

There are scenarios where a failing operation can't be handled or recovered by the caller. In those cases, it's more sensible to abort the execution. We use Javascript throws, but errors that subclass from the `Abort` and `Bug` classes exported by the `@catalysisdev/common/error` module. Abort errors cause the execution termination due to an unexpected condition on which the user must take action. Bug errors also cause the termination of the execution. Still, in this case, the error represents a bug that will be reported to the error tracking platform. Below are some examples of how to use the errors. Note how abort errors require including the cause of the error and the next steps that users should take:

```ts
import { Abort } from '@catalysisdev/core/common/error'

// Abort error

const DirectoryNotFoundError = () => new Abort("The directory app/ was not found", {
    cause: "The directory might not exist in the current directory",
    next: "Make sure the directory exists and try again"
})

// Bug error

const TestFailedError = new () => Bug("The test execution failed unexpectedly", {
    cause: "There might be a bug in the logic in the contract between Catalysis and the testing framework",
})
```

:::warning Rescuing from Abort and Bug errors
Rescuing from the above errors is **forbidden**. If you design an API that uses errors to notify the caller about failures,
create error classes that extend from the `Error` class from the standard library. Those errors are intended to be caught by the caller.
Otherwise, they'll bubble up and get reported as bugs.
:::



