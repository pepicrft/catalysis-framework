import { logger } from '@gestaltjs/core/cli'

const envLogger = () => {
  return logger.gestalt().child('env')
}

export default envLogger
