import { coreLogger } from '@gestaltjs/core/node/logger'

export const createPluginLogger = () => {
  return coreLogger().child('create-plugin')
}
