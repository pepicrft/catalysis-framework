import { coreLogger } from '@gestaltjs/core/node/logger'

export const checkLogger = () => {
  return coreLogger().child('check')
}
