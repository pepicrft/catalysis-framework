# Automation

In Javascript projects,
it's common to use the `scripts` section in projects' `package.json` files to declare scripts that are executable via `pnpm run {script_name}`.
While this is something that works with simple projects,
in large projects scripts can become complex having many implicit dependencies that make them harder to **reason about and optimize**.
For that reason,
we decided to build our automation upon [Nx](https://nx.dev/),
a powerful build system designed for monorepos.
