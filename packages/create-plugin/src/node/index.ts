import { errorHandler } from '@gestaltjs/core/common/error'
import { run, flush, settings, Errors } from '@oclif/core'

const initIndex = process.argv.findIndex((arg) => arg.includes('init'))
if (initIndex === -1) {
  const initIndex =
    process.argv.findIndex(
      (arg) =>
        arg.includes('bin/create-plugin') ||
        arg.includes('bin/dev') ||
        arg.includes('bin/run')
    ) + 1
  process.argv.splice(initIndex, 0, 'init')
}

const isDebug = process.env.DEBUG === '1'
settings.debug = isDebug

const runCreateProject = () => {
  run(void 0, import.meta.url)
    .then(flush)
    .catch((thrownError) => {
      return errorHandler(thrownError).then(Errors.handle)
    })
}

// eslint-disable-next-line import/no-default-export
export default runCreateProject
