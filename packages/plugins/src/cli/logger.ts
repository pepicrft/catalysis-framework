import { logger } from '@gestaltjs/core/cli'

export const pluginsLogger = () => {
  return logger.coreLogger().child('plugins')
}
