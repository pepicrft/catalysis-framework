import { logger } from '@gestaltjs/core/cli'

export const createPluginLogger = () => {
  return logger.coreLogger().child('create-plugin')
}
