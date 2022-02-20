import { logger as coreLogger } from '@gestaltjs/core/cli'

const typecheckLogger = coreLogger.gestalt.child('check')
export default typecheckLogger
