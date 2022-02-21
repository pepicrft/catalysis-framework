import { logger } from '@gestaltjs/core/cli'

const testLogger = () => {
  return logger.gestalt().child('test')
}

export default testLogger
