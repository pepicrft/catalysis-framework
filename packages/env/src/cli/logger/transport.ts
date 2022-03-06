import coreTransport, {
  moduleTransport,
} from '@gestaltjs/core/cli/logger/transport'

export default async (options: any) => {
  return await moduleTransport('env', await coreTransport(options))
}
