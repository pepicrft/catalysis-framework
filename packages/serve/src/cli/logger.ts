import { logger } from '@gestaltjs/core/cli'

const serveLogger = () => {
  return logger.core().child('serve')
}

export default serveLogger
