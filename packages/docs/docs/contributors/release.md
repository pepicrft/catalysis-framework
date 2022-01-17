# Release process

## Cadence

Releases are done **bi-weekly**.
In the current phase of the project,
the cadence is long enough to include a reasonable amount of changes,
and not too long to have users asking for a new release.

The upoming releases are listed below:
- January 24th
- February 7th
- February 21st
- March 7th
- March 21st
- April 4th
- April 18th
- May 2nd

## Process

### Publishing

The release is automated through a CI workflow.
When the version PR is merged by a member of the [core team](/docs/contributors/core-team),
we trigger the building a publishing of the packages to the NPM registry.
We use a tool,
[changesets](https://github.com/changesets/changesets),
that determines the the version based on the changes,
and builds and publishes the packages in the right order based on the dependency graph.

### Add a change

When changing any of the packages of the repository,
you'll have to run `pnpm run version:add` and changeset will guide you through the process of reflecting your changes.
Note that if you skip this PR when you open a PR,
CI will fail and prevent you from merging the PR.
