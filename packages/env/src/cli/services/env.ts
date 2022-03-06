import logger from '../logger'
import envinfo from 'envinfo'

export default async function () {
  const env = await envinfo.run(
    {
      System: ['OS', 'CPU'],
      Binaries: ['Node', 'Yarn', 'npm'],
      Browsers: ['Chrome', 'Firefox', 'Safari'],
      npmPackages: ['styled-components', 'babel-plugin-styled-components'],
    },
    { json: true, showNotFound: true }
  )
  // 1: Convert JSON to object: JSSON.parse(env)
  // 2: Implement a formatter (env: Env) => string
  // 3: Write unit tests
  // 4: Add support for --json: gestalt env --json
  // 5: Next:
  //   - Acceptance tests
  //   - Unix processes (standard input, output, errors)
}
