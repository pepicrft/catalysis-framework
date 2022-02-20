import { logger as coreLogger } from '@gestaltjs/core/cli'

const testLogger = coreLogger.gestalt.child('test')
export default testLogger
