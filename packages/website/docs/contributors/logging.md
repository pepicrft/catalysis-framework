# Logging

### A communication tool

Logging is the channel we use to communicate progress.
It uses [standard streams](https://en.wikipedia.org/wiki/Standard_streams) under the hood,
forwarding errors through the standard output,
and errors through the standard error.
In the Javascript ecosystem,
the most straightforward logging and a well-known solution is [`console.log()`](https://developer.mozilla.org/en-US/docs/Web/API/console/log).
It codifies strings into data and sends them through the standard stream.

It's also a [debugging tool](https://www.w3schools.com/js/js_debugging.asp).
In remote environments (e.g. production),
projects usually send their logs through a data pipeline,
which serializes and makes them queriable.
Because the destination of logs can be **humans or computers**,
the format of the logs varies.

When logs are processed by computers,
we want the logs to be structured and easily serializable,
for example,
using [JSON](https://en.wikipedia.org/wiki/JSON).
When a human is reading the logs,
we don't need to make them machine-readable.
Instead, we can use colors, spaces, and capitalization to create a semantic hierarchy and give some elements a special meaning.

Continuing with the logs for humans,
great logging is tightly connected to the **developer experience**,
but what makes great logging?
First and foremost,
communication needs to be **clear**.
Users should feel that we are speaking the same language.
We should be careful with not using internal lingo that means nothing to them.
Moreover,
we should communicate **concisely**.
Developers spend a lot of time reading logs and code.
If we add say more than what we have to,
we'll add up to the cognitive load.
And last but not least,
we should be **consistent** in communicating.
Otherwise, using Gestalt will feel like talking to different people who use different tones, words, and styles.

### Logging in GestaltJS

To help provide the above logging experience,
`@gestaltjs/core` includes a [`logger`](https://github.com/gestaltjs/gestalt/blob/main/packages/core/src/cli/logger.ts) utility that builds upon [pino](https://github.com/pinojs/pino).
The main reason for choosing Pino is its performance thanks to the usage of [Node Worker Threads](https://nodejs.org/api/worker_threads.html).
When GestaltJS are running in production,
it's vital that logging doesn't make the processing of requests slower.

Logged messages can include a **log level**.
It's used to determine whether the message is shown based on users' preference,
for example,
when they pass the `--verbose` argument when using the CLI.
The following log levels are available:
`fatal`, `error`, `warn`, `info`, `debug`, and `trace`.

**Note** that each package includes its own child logger under `src/cli`,
which must be used by the code in the package.
Package loggers include the package name in the logs.
Moreover, they can extend the formatting through [Pino Transports](https://github.com/pinojs/pino/blob/master/docs/transports.md).
By default, all loggers apply the same formatting.
But a particular package,
for example,
`@gestaltjs/serve` might want to accommodate the formatting for communicating the requests processed by the HTTP server.

```ts
import logger from './logger'

logger.success("The app has been built", "info")
```

### Message types

Besides the default function for logging output to the user,
`logger.log`,
there are functions for types of messages that are very common in the context of the CLI.

| API | When to use it |
| --- | --- |
| `logger.success` | To present messages that represent the success of an operation |

### Tokens

The `logger` API leverages [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) to split up logs into smaller pieces and apply semantic meaning to some of them. The semantic meaning is used to change the formatting depending on the semantic meaning. Here's an example:

```ts
import logger from "./logger"

logger.log(logger.content`App successfully created at ${logger.path(appPath)}`)
```

Note the `logger.path(appPath)` to tell the logger that `appPath` represents a path.

The following functions are available to give give units semantic meaning:

| API | When to use it |
| --- | --- |
| `logger.path` | To represent paths to directories or files |
| `logger.url` | To represent URLs. In terminals that support them, the name of the URL is presented instead of the full URL |
| `logger.command` | To represent a command with its arguments |
