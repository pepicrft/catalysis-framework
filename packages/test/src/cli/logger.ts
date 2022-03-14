import { logger } from '@gestaltjs/core/cli'

const testLogger = () => {
  return logger.core().child('test')
}

export default testLogger
