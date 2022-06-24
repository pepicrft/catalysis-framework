import { coreLogger } from '@gestaltjs/core/node/logger'

export const devLogger = () => {
  return coreLogger().child('dev')
}
