# Exporting the CLIs

When releasing new versions of the CLIs,
we pass the project's code **through Javascript transpilers and bundlers** to optimize it for the end-user.
In particular,
we convert Typescript code into Javascript,
eliminate transitive dependencies by bundling them alongside Gestalt's code,
and convert any CommonJS code into [ES modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).
It's important to note that a successful code transformation doesn't necessarily mean the resulting code will work.
Because of that,
[e2e](https://en.wikipedia.org/wiki/Acceptance_testing) tests play an essentials role in ensuring the integrity of the code and the compatibility with different [operative systems](https://en.wikipedia.org/wiki/Operating_system) and versions of [Node](https://nodejs.org/en/about/releases/).

Acceptance tests run `bin/export.js`, which simulates the transformation and the installation process,
yielding a setup close to what users will get when they install the CLI. The script takes one argument that represents the directory in which the CLIs will be exported:

```
bin/export /path/to/output/directory
```


When debugging issues or assessing that things work as expected, we recommend running the script and executing the CLIs from the exported artifacts.

