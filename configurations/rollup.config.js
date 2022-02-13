import esbuild from 'rollup-plugin-esbuild'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import path from 'pathe'
import stripShebang from 'rollup-plugin-strip-shebang'
import commonjs from '@rollup/plugin-commonjs'

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

export const external = ['readable-stream', 'glob']
