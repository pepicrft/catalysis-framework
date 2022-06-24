import { errorHandler } from '@gestaltjs/core/common/error'
import { run, flush, settings } from '@oclif/core'

const isDebug = process.env.DEBUG === '1'
settings.debug = isDebug

const runGestalt = () => {
  run(void 0, import.meta.url)
    .then(flush)
    .catch((thrownError) => {
      return errorHandler(thrownError)
    })
}

// eslint-disable-next-line import/no-default-export
export default runGestalt
