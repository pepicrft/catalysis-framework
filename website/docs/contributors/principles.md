# Principles

Building an excellent framework experience requires alignment with a set of principles we believe. What follows is a list of principles that we'll refer to when devising the project directions and providing feedback on contributions.

## 1. Make the simple things easy, and everything possible

It might feel tempting to provide a high degree of flexibility as software crafters. The classic manifestation of this is a plugin system that allows swapping pieces of the framework.
Everything becomes a plugin, even for the most common needs.
*Do you want to access a database?* There’s a plugin for that.
*Are you thinking about doing background jobs?* There’s a plugin too.
Everything is possible with the framework, but **at the cost of making the simple things hard**. They are hard because you are not given a hand when you stumble upon everyday needs when building web apps like accessing databases or running background jobs. You have to search for plugins, decide on the one that’s more suitable to your needs, and hope that the plugin integrates reliably with the rest of the stack. Moreover, there might be incompatibilities between plugins and the rest of the framework, leading to broken developer experiences.

**Gestalt makes simple things easy through well-integrated defaults and abstractions.**

If the defaults don't align with the projects' requirements,
users will get the option to change them,
but they need to opt-out of the defaults.

This enables a seamless and decision-free experience that helps crafters gain momentum when materializing their ideas through software.

