import { coreLogger } from '@gestaltjs/core/node/logger'

export const pluginsLogger = () => {
  return coreLogger().child('plugins')
}
