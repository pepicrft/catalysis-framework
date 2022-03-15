---
title: Building a cohesive framework experience that sparks joy
authors: [pedro]
tags: [motivation, developer experience, rails]
---

I love [Rails](https://rubyonrails.org/).
I often find myself going back to the framework without really understanding why.
There’s something in it that not many frameworks have been able to replicate.
*What is it?*
After a lot of thinking,
I concluded that it’s a combination of **beautifully well-designed abstractions and building blocks** and a **low user cognitive load that keeps them focused**.

Designing abstractions that are a pleasure to use is something that many Javascript frameworks have already approximated.
In fact,
Javascript and AST-based tools open up new opportunities.
The [NextJS's file-based routing](https://nextjs.org/docs/routing/introduction),
and [SvelteKit adapters](https://kit.svelte.dev/docs/adapters) are excellent examples of that.
However,
the Javascript ecosystem of frameworks keeps exposing users to a high cognitive load because they put flexibility upfront.
I like to call this phenomenon **a configurable convention over configuration.**
To explain what I mean by it,
let me draw an analogy.

Imagine a tiny orchestra.
We have a violinist (e.g. Vite),
clarinetists (e.g. Jest),
flutists (e.g. Express),
double bassists (e.g. Storybook),
and a pianist (e.g. Prisma).
**Some frameworks aim to be the score**  and be open for other instruments to join (i.e. plugins).
Having an orchestra and the store is a requisite for the concert,
but it's insufficient.
Chances are that without a conductor,
the various instrumentalists won't play in harmony.
Or they'll start sounding in harmony, but things start to get hairy after new members join the orchestra.
**Rails is a conductor framework, and we want GestaltJS to be a conductor.**

The above can be illustrated with the following diagram.
Rails development is closer to building complex structures with [LEGO](https://www.lego.com).
You get a set of pieces that are designed to fit well together.
When you stumble upon common needs across web apps,
like styling your views with CSS or running background jobs,
there's a default piece for that.
You don't need to think about what plugin or third-party dependency to bring.
Having to make that decision **takes you away from the momentum of building**.
Moreover, you might end up with something that doesn't quite fit with the rest of the framework experience-wise.
What some frameworks propose is the example on the right.
The setup is full of shims because we have different shapes and nature pieces.
They leak internals in projects through configuration files and require developers to decide on fundamental aspects like how to style the UI.

![A diagram that compares the setup of Rails with the common setup in Javascript frameworks](./rails-vs-others.png)

It's worth mentioning that the setup on the right often comes with deeply-nested dependency graphs.
In an ecosystem where projects lack a thorough testing strategy that helps them detect breaking changes,
the setup often leads to resolved dependency graphs where there are broken contracts between dependencies.
As a consequence, users find themselves *deleting `node_modules`* because it's the only solution they find on the internet.
So on top of having to make many decisions,
**you have to deal with the frustration of working with a brittle setup that falls apart frequently.**

GestaltJS will start by combining and shimming dependencies like many frameworks do.
Still, some subtle differences will make a massive difference in the experience developers will get.

First, the framework will come with [**strong opinions loosely held**](https://feld.com/archives/2019/05/bad-entrepreneurial-cliches-strong-opinions-loosely-held).
Developers already have to make many decisions when building apps,
and we don't want to add more to the list.
If what you are trying to do is shared across web apps, GestaltJS will have an opinion.

Second, we'll **abstract away the framework's internals**.
If we use [Vitest](https://vitest.dev/) for running unit tests,
that'll be abstracted away through APIs and commands.
There will be no configuration file on the project side that couples projects with the framework's internals.
Imagine if we created projects with a [Jest](https://jestjs.io/) configuration file,
it'd be hard for us to migrate to a different testing solution if necessary without breaking users' projects.
And breaking projects is not fun for users.
We don't want to be a framework that requires you to manually migrate things.

And last, we'll **flatten the dependency graph** by vendoring dependencies with a bundling tool like [Rollup](https://rollupjs.org/guide/en/).
Thanks to that we can run [acceptance tests](https://en.wikipedia.org/wiki/Acceptance_testing) with the exact same code that users will get when installing GestaltJS,
and therefore minimize the chances of developers coming across the need for *deleting `node_modules`*.
Another solution would be changing the ecosystem's mindset around dependencies and testing, but that's a much more significant undertaking. We'll plant our seed there through evangelizing excellent testing practices and building fewer but larger packages.

**GestaltJS development will feel cohesive and spark joy.**
