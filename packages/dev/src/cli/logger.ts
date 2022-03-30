import { logger } from '@gestaltjs/core/cli'

const serveLogger = () => {
  return logger.core().child('dev')
}

export default serveLogger
