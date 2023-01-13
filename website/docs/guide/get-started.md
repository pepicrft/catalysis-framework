# Get started

Ready to have fun with Catalysis? Let's make sure you have the right tools in your environment and dive right into

### System requirements

Before you get started with Catalysis,
you'll need the following tools in your environment:

- [**Node >= 18.0.0**:](https://nodejs.org/en/) Catalysis's CLI and runtime APIs depend on the Node runtime, so its presence is required.
- [**PNPM:**](https://pnpm.io/) To [ensure a great developer experience](/docs/contributors/decision-record/2022-09-01-pnpm) managing projects' dependencies, we require projects to use PNPM as a package manager.

We recommend using [asdf](https://asdf-vm.com/) to manage the above tools' installation and scoping the versions to your Catalysis project.

### Creating the first project

To create our first project, all we need to do is run the following command:

```bash
pnpm create @catalysisdev/create-project@latest
```

The command will prompt necessary information, generate the project, and install its NPM dependencies.
