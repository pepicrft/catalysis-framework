import { coreLogger } from '@gestaltjs/core/node/logger'

export const createProjectLogger = () => {
  return coreLogger().child('create-project')
}
