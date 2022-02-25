# Logging

### A communication tool

Logging is a the channel we use to communicate progress.
It uses [standard streams](https://en.wikipedia.org/wiki/Standard_streams) under the hood forwarding errors through the standard output,
and errors through the standard error.
In the Javascript ecosystem,
the simplest logging and well-known solution is [`console.log()`](https://developer.mozilla.org/en-US/docs/Web/API/console/log).
It codifies strings into data, and sends them through the standard stream.

It's also a [debugging tool](https://www.w3schools.com/js/js_debugging.asp).
In remote environments (e.g. production),
projects usually send their logs through a data pipeline,
which serializes and makes them queriable.
Because the destination of logs can be **humans or computers**,
the format of the logs varies.

When logs are processed by computers,
we want the logs to be structured and easily serializable,
for example using [JSON](https://en.wikipedia.org/wiki/JSON).
When it's a human who is reading the logs,
we don't need to make them machine-readable.
Instead, we can use tools like colors, spaces, and capitalization,
to create a semantic hierarchy and give some elements a special meaning.

Continuing with the logs for humans,
a great logging is tighly connected to the **developer experience**,
but what does make a great logging?
First and foremost communication needs to be **clear**.
Users should feel that we are skeaping their same language.
We should be careful with not using internal lingo that means nothing to them.
Moreover,
we should communicate **concisely**.
Developers,
spend a lot of time reading logs and code.
If we add say more than what we have to,
we'll be adding up to the cognitive load.
And last,
but not least,
we should be **consistent** in how we communicate.
Otherwise,
using Gestalt will feel like talking to different people that use different tone, words, and style.

### Logging in GestaltJS

To help provide the above logging experience,
`@gestaltjs/core` includes a [`logger`](https://github.com/gestaltjs/gestalt/blob/main/packages/core/src/cli/logger.ts) utility that builds upon [pino](https://github.com/pinojs/pino).
The main reason for choosing Pino is its performance thanks to the usage of [Node Worker Threads](https://nodejs.org/api/worker_threads.html).
When GestaltJS are running in production,
it's important that logging doesn't contribute to making the processing of requests slower.

Logged messages can include a **log level**.
It's used to determine whether the message is shown based on users' preference,
for example when they pass the `--verbose` argument when using the CLI.
The following log levels are available:
`fatal`, `error`, `warn`, `info`, `debug`, and `trace`.

**Note** that each package includes its own child logger under `src/cli`,
which must be used by the code in the package.
Package loggers include the package name in the logs.
Moreover, they can extend the formatting through [Pino Transports](https://github.com/pinojs/pino/blob/master/docs/transports.md).
By default, all loggers apply the same formatting.
But a particular package,
for example `@gestaltjs/serve` might want to accommodating the formatting for communicating the requests processed by the HTTP server.

```ts
import logger from './logger'

logger.success("The app has been built", "info")
```

### TODO
- Output tokens
- Message types
