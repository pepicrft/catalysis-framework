# Directory structure

Catalysis embraces convention over configuration for the projects' directory structure and module naming.
This is crucial to ensure that projects are easy to navigate regardless of its size and that developers can jump between Catalysis projects with little overhead.

When you create a new Catalysis project


<!--
We will go over those directories one by one:

_build - a directory created by the mix command line tool that ships as part of Elixir that holds all compilation artifacts. As we have seen in "Up and Running", mix is the main interface to your application. We use Mix to compile our code, create databases, run our server, and more. This directory must not be checked into version control and it can be removed at any time. Removing it will force Mix to rebuild your application from scratch.

assets - a directory that keeps everything related to source front-end assets, such as JavaScript and CSS, and automatically managed by the esbuild tool.

config - a directory that holds your project configuration. The config/config.exs file is the entry point for your configuration. At the end of the config/config.exs, it imports environment specific configuration, which can be found in config/dev.exs, config/test.exs, and config/prod.exs. Finally, config/runtime.exs is executed and it is the best place to read secrets and other dynamic configuration.

deps - a directory with all of our Mix dependencies. You can find all dependencies listed in the mix.exs file, inside the defp deps do function definition. This directory must not be checked into version control and it can be removed at any time. Removing it will force Mix to download all deps from scratch.

lib - a directory that holds your application source code. This directory is broken into two subdirectories, lib/hello and lib/hello_web. The lib/hello directory will be responsible to host all of your business logic and business domain. It typically interacts directly with the database - it is the "Model" in Model-View-Controller (MVC) architecture. lib/hello_web is responsible for exposing your business domain to the world, in this case, through a web application. It holds both the View and Controller from MVC. We will discuss the contents of these directories with more detail in the next sections.

priv - a directory that keeps all resources that are necessary in production but are not directly part of your source code. You typically keep database scripts, translation files, and more in here. Static and generated assets, sourced from the assets directory, are also served from here by default.

-->


<!--
lib/hello
├── application.ex
├── mailer.ex
└── repo.ex
-->

<!--
lib/hello_web
├── controllers
│   └── page_controller.ex
├── templates
│   ├── layout
│   │   ├── app.html.heex
│   │   ├── live.html.heex
│   │   └── root.html.heex
│   └── page
│       └── index.html.heex
├── views
│   ├── error_helpers.ex
│   ├── error_view.ex
│   ├── layout_view.ex
│   └── page_view.ex
├── endpoint.ex
├── gettext.ex
├── router.ex
└── telemetry.ex
-->
