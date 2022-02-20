import { logger as coreLogger } from '@gestaltjs/core/cli'

const buildLogger = coreLogger.gestalt.child('build')
export default buildLogger
