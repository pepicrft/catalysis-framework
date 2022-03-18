# Errors

Errors **can happen and will happen**,
and therefore,
we should account for error scenarios when writing code.
Try to follow conventions and patterns that make error scenarios impossible to reach.
For example,
prefer pure functions, classes, and modules free of side effects.
Unfortunately,
we can't eliminate error scenarios completely because there might be bugs introduced by us or environment configurations we didn't design for.
For example,
trying to run code that depends on an Internet connection in a system that doesn't have a connection.
The chance is that we didn't think about that,
and users will get a non-actionable stack trace.
**Bad errors ruin the developer experience.**
But what makes great errors?
Let's dive into a set of principles that GestaltJS errors must embrace.


## Designing great errors

- **Clear:** It should answer a straightforward question: *What happened?* We need to make an effort to understand errors to explain them to users in plain words. If errors are coming from third-party dependencies, the errors that we get from them are not self-descriptive. Translate them into the users' language.
- **Actionable:** When users get an error, they want to know what to do next. In scenarios where we know what to do next, for example, when they are trying to run a CLI command outside of a GestaltJS project, we should provide a set of next steps that they can follow. If we leave users with no actions, the action that they'll most likely take will be opening GitHub issues, which increases our support load.

## Error module

The above principles are codified in the `error` module from `@gestaltjs/gestalt`,
which exposes `Abort` and `Bug` error classes.
Abort errors cause the termination of the execution due to an unexpected condition that the user needs to take action on.
Bug errors also cause the termination of the execution.
Still,
in this case,
the error represents a bug that will be reported to the error tracking platform. Below are some examples of how to use the errors. Note how abort errors require including the cause of the error and the next steps that users should take:

```ts
import { error } from "@gestaltjs/gestalt"

// Abort error

const DirectoryNotFoundError = new error.Abort("The directory app/ was not found", {
    cause: "The directory might not exist in the current directory",
    next: "Make sure the directory exists and try again"
})

// Bug error

const TestFailedError = new error.Bug("The test execution failed unexpectedly", {
    cause: "There might be a bug in the logic in the contract between GestaltJS and the testing framework",
})
```

:::caution Rescuing from Abort and Bug errors
Rescuing from the above errors is **forbidden**. If you design an API that uses errors to notify the caller about failures,
create error classes that extend from the `Error` class from the standard library. Those errors are intended to be caught by the caller.
Otherwise, they'll bubble up and get reported as bugs.
:::



