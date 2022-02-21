import coreTransport from '@gestaltjs/core/cli/logger/transport'
import pino from 'pino'

export default async (options: pino.TransportBaseOptions) => {
  return coreTransport(options)
}
