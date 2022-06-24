import { coreLogger } from '@gestaltjs/core/node/logger'

export const dbLogger = () => {
  return coreLogger().child('db')
}
