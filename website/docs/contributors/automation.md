# Automation

In Javascript projects, it's common to use the `scripts` section in projects' `package.json` files to declare scripts that are executable via `pnpm run {script_name}`. While it works with simple projects, large projects' scripts can become complex, with many implicit dependencies making them harder to reason about and optimize. For that reason, we decided to build our automation upon Nx, a powerful build system designed for monorepos. [Nx](https://nx.dev/) leverages the graph information to offer local and remote caching, which makes [incremental builds possible](https://en.wikipedia.org/wiki/Incremental_build_model). You can run `pnpm graph` to get an overview of the workspace projects' graph.

## Interacting with the workspace and projects

For familiarity, we provide an interface via scripts in package.json's so that you can interact with the workspace and its projects by running `pnpm run build|test|lint|lint:fix|type-check`. When done with the workspace, it'll run the task in every project. If you want to only run it for the projects affected by your changes you can use the "affected" version of the script. For example, `pnpm run build:affected`.

If you want to run Catalysis from the repository, you can do the following:

```bash
pnpm run catalysis ...
```

## Configuration

### nx.json

Nx's main configuration file is [nx.json](https://nx.dev/reference/nx-json) at the root of the workspace. It contains the configuration that applies to the whole workspace and defaults inherited by individual projects. Of all the attributes, the most relevant ones relate to caching. We can indicate how build tasks depend on each other and provide additional information via `runtimeCacheInputs` that Nx uses to calculate the hash to store and look up artifacts in the cache.

### workspace.json

Even though Nx can infer the workspace using the PNPM workspace as the source of truth, we provide that information explicitly through the `workspace.json` file at the root of the workspace.

### project.json

Every project includes a `project.json` providing metadata about the project and the available targets (i.e., tasks). Cacheable tasks like build declare the target's `inputs` and `outputs`. Nx uses inputs to calculate the hash to identify artifacts in the cache.
