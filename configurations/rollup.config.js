import esbuild from 'rollup-plugin-esbuild'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import path from 'pathe'
import stripShebang from 'rollup-plugin-strip-shebang'
import commonjs from '@rollup/plugin-commonjs'

export const features = ['build', 'db', 'lint', 'serve', 'test', 'check']

export const distDir = (packageDir) => {
  return process.env.GESTALT_DIST_DIR || path.join(packageDir, 'dist')
}

export const plugins = (packageDir) => {
  return [
    stripShebang(),
    resolve({
      preferBuiltins: true,
    }),
    commonjs({
      include: /node_modules/,
      transformMixedEsModules: true,
    }),
    esbuild({
      sourceMap: true,
      target: 'ES2020',
      tsconfig: path.join(packageDir, 'tsconfig.json'),
    }),
    json(),
  ]
}

/**
 * "piano" and "piano-pretty" use NodeJS thread workers would require custom
 * bundling logic to respect some of their modules' structure and instruct
 * the runtime on where the bundled modules live.
 * To keep things simple, we are treating those as external dependencies that
 * are installed as transitive dependency of @gestaltjs/core
 */
export const external = ['readable-stream', 'glob', 'pino', 'pino-pretty']
