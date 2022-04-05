# Architecture

Gestalt follows a **modular architecture** to make the code easier to maintain and contribute to.
Modules,
which we represent and distribute as NPM packages,
have well-defined responsibilities and clear boundaries (APIs) that abstract away implementation details.
Modules are organized in layers,
one of which contains the modules representing the different commands the CLI provides (e.g. build, serve).
We refer to them as **features** of the framework.
Features must not know about each other.
The code that knows how to build shouldn't know anything about how the app is served.
Similarly, the module that knows how to lint the app doesn't know how to build it.
Thanks to organizing the features horizontally we can add new features without disrupting others,
and contribute to an area of the project without having to familiarize ourselves with the rest.

| Package/s | Responsibilities | Examples |
| --- | --- | ---- |
| `gestaltjs` | It represents the CLI and the public interface to the frameworks. Users should only import code from here | oclif CLI configuration, public `index.ts` |
| `@gestaltjs/build` | It contains utilities for building an app | `Builder` class |
| `@gestaltjs/test` | It contains utilities for testing the app code | `Tester` class |
| `@gestaltjs/check` | It contains utilities for checking the code | `TypeChecker` class |
| `@gestaltjs/dev` | It contains utilities for serving the app locally and in production | `Server` class |
| `@gestaltjs/core` | It contains utilities and models that are shared across all the features above it | `App` model |
| `@gestaltjs/renderer` | It contains models and utilities to create new renderers | `Renderer` model and `defineRenderer` function |
