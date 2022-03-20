# Why GestaltJS

Web development has gone through a lot of innovation recently.
UI abstractions made it easy to build componentized websites built upon community-built building blocks (e.g., [React](https://reactjs.org/), [Vue](https://vuejs.org/), and [Svelte](https://svelte.dev/)).
Infrastructure got abstracted away to the point that developers no longer have to worry about scaling up their infrastructure (e.g., [Netlify](https://netlify.com/), [Vercel](https://vercel.com/), [Fly](https://fly.io/))
or how to bring continuous deployment into their workflows.
**There’s never been a better time to build web apps.**

However,
most frameworks **nudge developers onto specific models** that might not suit their needs best.
For example,
having to do React when Vue is a more suitable option considering the team’s skillset,
having to serve the data through a [GraphQL](https://graphql.org/) API and deal with state client-side when the page could get rendered with its data server-side,
or not being able to deploy a long-running server because the framework outputs Javascript functions representing the various endpoints of your apps. We believe that frameworks must be **weakly opinionated about the UI layer, the interaction between UI and the business logic, and the deployment model**.
Achieving that is possible if we treat Javascript tools not just as a mechanism to polyfill the code and enable new supersets and abstractions,
but as a compiler;
a compiler that transforms code built upon the framework abstractions that are designed to spark joy when using them,
into code that’s optimized for the platform in which it’ll be deployed.
This is inspired by [SvelteKit’s](https://kit.svelte.dev/) idea of [adapters](https://kit.svelte.dev/docs#adapters).

Moreover, frameworks usually center their abstractions and convenience around the UI domain,
and leave the rest up to the developers:
background jobs, data persistence, reusability across mobile and desktop, code patterns to encapsulate business logic, setting up a testing suite.
While flexible because you get to build your own stack,
**many  developers want a default opinionated experience that allows them to focus on building**.
The more energy they have to pour into plumbing,
the less energy is left to generate value through technology.
Note that an opinionated experience doesn’t need to compromise the flexibility; it just doesn’t make it the default.
Flexibility might be necessary at a particular scale,
and therefore,
 we shouldn’t limit that.

We’ll build this batteries-included development experience as an **open-source framework that’s community-driven and free of business interests.**
We strongly believe in it as a beautiful altruistic activity, a space for people to share their ideas with others and create a foundation for other ideas to be built upon.
We know that this might naturally lead to a less attractively marketed solution, but that is rooted in values that will make it last.
We are also fostering a mentorship-oriented environment for people to grow and get inspired.

What shape the abstractions and workflows will take is yet to be defined. We’ll **take inspiration from the pool of fantastic community web frameworks** and share how ideas and opinions take shape and evolve with you.

If this sounds interesting and you would like to get involved and/or stay up to date,
you can follow us on [Twitter](https://twitter.com/gestaltjs) and join our [Discord server](https://discord.gg/7gvRstAKTU).
