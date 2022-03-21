# Get started

Contributions bring a diversity of ideas to the project,
which enriches the project.
Because of that,
we design the project and the documentation to ease contributions.

A contribution can come in many shapes:
1. [GitHub issues](https://github.com/gestaltjs/gestalt/issues) reporting bugs or sharing ideas.
2. Community support.
3. Framework evangelization.
4. Code contributions as [pull requests](https://en.wikipedia.org/wiki/Distributed_version_control#Pull_requests).

The pages in "contributors" provide all the context and tools necessary to nail your contributions. Because for most contributions, you'll need to have the project locally, let's dive right into how to set up your local environment to run and debug the project locally.

### Setting up the project locally

1. Make sure the following tools are available in your system.
    - [**NodeJS:**](https://nodejs.org/en/) Any version above 14. We recommend the version specified in the `.nvmrc` file.
    - [**pnpm:**](https://pnpm.io/) We use pnpm for dependency management over [Yarn](https://yarnpkg.com/) or [NPM](https://www.npmjs.com/) due to its performance and reliability
    - [**shadowenv:**](https://github.com/Shopify/shadowenv) It'll activate environment variables when entering the project directory and allow you to run the CLIs from any nested directory inside the project.
2. Clone the repository in your system. You can do so by running `git clone https://github.com/gestaltjs/gestalt.git`. Alternatively, you can use [GitPod](https://gitpod.io/#https://github.com/gestaltjs/gestalt) to develop on the browser.
3. Install the NPM dependencies by running `pnpm install`
4. Run `bin/create-app` if you want to create a new app or `bin/gestalt` to run the Gestalt CLI.
5. Voilà 🎉.

Before debugging and contributing code,
we recommend gaining some context around [the project architecture](/contributors/architecture).


:::tip Shadowenv
Shadowenv activates project-scoped environments.
For example, we include the `bin/` directory of the project in the `PATH` environment variable,
and with that, you can run `create-app` and `gestalt` from any subdirectory.
The environment deactivates when you leave the project's directory.
:::

