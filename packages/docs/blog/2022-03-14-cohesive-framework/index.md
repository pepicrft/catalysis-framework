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
I came to the conclusion that it’s a combination of **beautifully well-designed abstractions and building blocks**,
and a **low user cognitive load that keeps them focused**.

Designing abstractions that are a pleasure to use is something that many Javascript frameworks have already approximated.
In fact,
Javascript and AST-based tools opens up new opportunities.
Excellent examples of that are the [NextJS's file-based routing](https://nextjs.org/docs/routing/introduction),
and [SvelteKit adapters](https://kit.svelte.dev/docs/adapters).
However,
the Javascript ecosystem of frameworks keeps exposing users to a high cognitive load because they put flexibility upfront.
I like to call this phenomenom **configurable convention over configuration.**
To explain what I mean by it,
let me draw an analogy.

Imagine a tiny orchestra.
We have a violinist (e.g. Vite),
clarinetists (e.g. Jest),
flutists (e.g. Express),
double bassists (e.g. Storybook),
and a pianist (e.g. Prisma).
**Many Javascript frameworks aim to be the score**,
and be open for other instruments to join (i.e. plugins).
Having a orchestra and the store is a requisite for the concert but it's not sufficient.
Chances are that without a conductor,
the various instrumentalists won't play in harmony.
Or they'll start sounding in harmony,
but after new members join the orchesta,
things start to get hairy.
**Rails is a conductor framework.**

Due to historical reasons,
many frameworks in Javascript design for flexibility.
But as a user,
when you have a lot of flexibility you end up going through [analysis paralysis](https://en.wikipedia.org/wiki/Analysis_paralysis).
You get a conventional project open to configuration,
and you are responsible to evolve and iterate on that initial convention

