import { error, cli, environment, logger } from '@gestaltjs/core/cli'
import { run, flush, settings, Errors } from '@oclif/core'
import { setup as setupLogger } from './logger'

setupLogger()

const isDebug = process.env.DEBUG === '1'
settings.debug = isDebug

const runCreateApp = () => {
  run(void 0, import.meta.url)
    .then(flush)
    .catch((thrownError) => {
      return error.handler(thrownError).then(Errors.handle)
    })
}

export default runCreateApp
