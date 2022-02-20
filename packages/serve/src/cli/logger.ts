import { logger as coreLogger } from '@gestaltjs/core/cli'

const serveLogger = coreLogger.gestalt.child('serve')
export default serveLogger
