import { coreLogger } from '@gestaltjs/core/node/logger'

export const testLogger = () => {
  return coreLogger().child('test')
}
