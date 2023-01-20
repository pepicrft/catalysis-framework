import { runCLI } from '@catalysisdev/core/node/cli'

// eslint-disable-next-line import/no-default-export
export default async function runCatalysis() {
  await runCLI({
    name: 'create-project ',
    moduleURL: import.meta.url,
  })
}
