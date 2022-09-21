import { coreLogger } from '@gestaltjs/core/node/logger'

export const infoLogger = () => {
  return coreLogger().child('info')
}
