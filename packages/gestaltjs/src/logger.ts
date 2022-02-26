import { logger } from '@gestaltjs/core/cli'

export const features = ['build', 'db', 'lint', 'serve', 'test', 'check']

export function setup() {
  logger.setupGestaltLogger({
    targets: features.map((feature) => ({
      target: `./cli/logger/transports/${feature}.js`,
      options: { module: feature },
      level: 'debug',
    })),
  })
}
