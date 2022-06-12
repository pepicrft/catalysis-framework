import esbuild from 'rollup-plugin-esbuild'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import * as path from 'pathe'
import stripShebang from 'rollup-plugin-strip-shebang'
import commonjs from '@rollup/plugin-commonjs'

export const distDir = (packageDir) => {
  return process.env.GESTALT_DIST_DIR || path.join(packageDir, 'dist')
}

export const aliases = (packageDir) => {
  const coreNodeModules = ['path', 'fs', 'command', 'tsc', 'eslint']
  return [
    ...coreNodeModules.map((module) => ({
      find: `@gestaltjs/core/node/${module}`,
      replacement: path.join(packageDir, `../core/src/node/${module}.ts`),
    })),
    {
      find: 'gestaltjs/plugin',
      replacement: path.join(packageDir, '../gestaltjs/src/runtime/plugin.ts'),
    },
    {
      find: '@gestaltjs/core/node/plugin',
      replacement: path.join(packageDir, '../core/src/node/plugin.ts'),
    },
    {
      find: '@gestaltjs/core/cli',
      replacement: path.join(packageDir, '../core/src/cli/index.ts'),
    },
    {
      find: '@gestaltjs/core/runtime',
      replacement: path.join(packageDir, '../core/src/runtime/index.ts'),
    },
    {
      find: '@gestaltjs/core/shared',
      replacement: path.join(packageDir, '../core/src/shared/index.ts'),
    },
    {
      find: '@gestaltjs/testing',
      replacement: path.join(packageDir, '../testing/src/index.ts'),
    },
    {
      find: new RegExp('^\\$(.*)$'),
      replacement: path.join(packageDir, './src/$1.ts'),
    },
  ]
}

export const plugins = (packageDir) => {
  return [
    stripShebang(),
    resolve({
      preferBuiltins: true,
      aliases: aliases(packageDir),
    }),
    commonjs({
      include: /node_modules/,
      transformMixedEsModules: true,
    }),
    esbuild({
      sourcemap: true,
      target: 'ES2020',
      tsconfig: path.join(packageDir, 'tsconfig.json'),
    }),
    json(),
  ]
}

/**
 * "pino" and "pino-pretty" use NodeJS thread workers would require custom
 * bundling logic to respect some of their modules' structure and instruct
 * the runtime on where the bundled modules live.
 * To keep things simple, we are treating those as external dependencies that
 * are installed as transitive dependency of @gestaltjs/core
 */
export const external = async (packageDir) => {
  const packageJson = await import(path.join(packageDir, 'package.json'))
  const entries = [
    /@gestaltjs\/core/,
    /@gestaltjs\/plugins/,
    /source-map-support/,
    /electron/,
    ...Object.keys(packageJson.dependencies ?? {}),
    ...Object.keys(packageJson.peerDependencies ?? {}),
  ]
  return entries
}
