# Errors

Errors **can happen and will happen** and therefore,
we should account for error scenarios when writing code.
Try to follow conventions and patterns that make error scenarios impossible to reach.
For example,
prefer pure functions, classes, and modules free of side effects.
Unfortunately,
we can't eliminate error scenarios completely because there might be bugs introduced by us or environment configurations we didn't design for.
For example,
trying to run code that depends on an Internet connection in a system that doesn't have a connection.
The chance is that we didn't think about that,
and users will get a non-actionable stack trace.
**Bad errors ruin the developer experience.**
But what makes great errors?
Let's dive into a set of principles that GestaltJS errors must embrace.


## Designing great errors

- **Clear:** It should answer a very simple question: *What happened?*



