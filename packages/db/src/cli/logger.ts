import { logger as coreLogger } from '@gestaltjs/core/cli'

const dbLogger = coreLogger.gestalt.child('db')
export default dbLogger
