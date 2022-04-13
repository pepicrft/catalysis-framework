import { error } from '@gestaltjs/core/cli'
import { run, flush, settings } from '@oclif/core'

const isDebug = process.env.DEBUG === '1'
settings.debug = isDebug

const runCreateApp = () => {
  run(void 0, import.meta.url)
    .then(flush)
    .catch((thrownError) => {
      return error.handler(thrownError)
    })
}

export default runCreateApp
