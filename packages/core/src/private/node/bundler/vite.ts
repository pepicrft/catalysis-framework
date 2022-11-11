import { BundlerInitOptions, Bundler } from '../bundler'
import { createServer, ViteDevServer } from 'vite'

/**
 * A type that represents the options to initialize a Vite bundler.
 */
type ViteBundlerOptions = BundlerInitOptions & {
  /** The instance of the Vite server */
  vite: ViteDevServer
}

/**
 * A bundler that uses Vite internally for bundling.
 * Website: https://vitejs.dev/
 */
export class ViteBundler implements Bundler {
  options: ViteBundlerOptions

  constructor(options: ViteBundlerOptions) {
    this.options = options
  }

  async close(): Promise<void> {
    await this.options.vite.close()
  }
}

export async function createViteBundler(
  options: BundlerInitOptions
): Promise<ViteBundler> {
  const vite = await createServer({
    root: options.directory.pathString,
    cacheDir: options.cacheDirectory?.pathString,
    esbuild: {},
    server: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      middlewareMode: 'true',
    },
    clearScreen: false,
    logLevel: 'silent',
    optimizeDeps: {
      entries: [],
    },
    resolve: {
      alias: options?.resolve?.aliases,
    },
    build: {
      watch: {},
    },
  })
  return new ViteBundler({
    ...options,
    vite,
  })
}
