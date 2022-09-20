import { coreLogger } from '@gestaltjs/core/node/logger'

export const buildLogger = () => {
  return coreLogger().child('build')
}
