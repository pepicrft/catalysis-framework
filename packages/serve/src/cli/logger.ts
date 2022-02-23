import { logger } from '@gestaltjs/core/cli'

const serveLogger = () => {
  return logger.gestalt().child('serve')
}

export default serveLogger
