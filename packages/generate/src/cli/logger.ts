import { coreLogger } from '@gestaltjs/core/node/logger'

export const generateLogger = () => {
  return coreLogger().child('generate')
}
