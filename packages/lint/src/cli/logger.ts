import { logger as coreLogger } from '@gestaltjs/core/cli'

const lintLogger = coreLogger.gestalt.child('lint')
export default lintLogger
