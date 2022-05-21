/* eslint-disable no-useless-escape */
import ReactPlugin from './gestalt.plugin'
import { describe, expect, test } from 'vitest'
import { createServer } from 'vite'
import { fs, Plugin } from '@gestaltjs/plugins'
import { Plugin as RollupPlugin } from 'rollup'
import { temporary } from '@gestaltjs/testing'
import { rollup } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import { findPathUp, joinPath, moduleDirname } from '@gestaltjs/core/node/path'

describe('plugin', () => {
  test('ssr', async () => {
    // Given
    const plugin = await ReactPlugin()
    const viteServer = await getViteServer(plugin, 'component.jsx')

    // When
    const got = await (await viteServer.ssrLoadModule('ssr')).default()

    // Then
    expect(got).toMatchInlineSnapshot('"<div>Hello world</div>"')
  })
  test('hydrate', async () => {
    await temporary.directory(async (tmpDir) => {
      // Given
      const plugin = await ReactPlugin()
      const outputFilePath = joinPath(tmpDir, 'hydrate.js')

      // When
      await buildWithRollup(plugin, outputFilePath)

      // Then
      const outputContent = await fs.readFile(outputFilePath)
      expect(outputContent).toMatchInlineSnapshot(`
        "import ReactDOM from 'react-dom';
        import React\$1 from 'react';

        function ComponentToHydrate() {
          return /* @__PURE__ */ React\$1.createElement(\\"div\\", null, \\"Hello world\\");
        }

        const domElement = document.querySelector(\\"#app\\");
        ReactDOM.hydrate(/* @__PURE__ */ React.createElement(ComponentToHydrate, null), domElement);
        "
      `)
    })
  })
})

async function buildWithRollup(plugin: Plugin, outputFilePath: string) {
  await (
    await rollup({
      input: 'hydrate',
      output: { file: outputFilePath },
      external: ['react', 'react-dom'],
      plugins: [
        ...getRollupPlugins(plugin, 'component.jsx', '#app'),
        esbuild({
          logLevel: 'silent',
          include: /\.[jt]sx?$/,
          exclude: /node_modules/,
          sourceMap: false,
          target: 'es2017',
          jsx: 'transform',
          jsxFactory: 'React.createElement',
          jsxFragment: 'React.Fragment',
        }),
      ],
    })
  ).write({ file: outputFilePath })
}

function getRollupPlugins(
  plugin: Plugin,
  componentModuleId: string,
  domElementSelector?: string
): RollupPlugin[] {
  return [
    {
      name: 'react-plugin',
      resolveId: (moduleId: string) => {
        if (moduleId === 'ssr') {
          const extension = plugin.renderer?.ssr.extension ?? 'js'
          return `ssr.${extension}`
        } else if (moduleId === 'hydrate') {
          const extension = plugin.renderer?.hydrate.extension ?? 'js'
          return `hydrate.${extension}`
        } else if (moduleId === componentModuleId) {
          return `${componentModuleId}`
        }
        return undefined
      },
      load: async (moduleId: string) => {
        if (moduleId === `ssr.jsx`) {
          return await plugin.renderer?.ssr.content(componentModuleId)
        } else if (moduleId === `hydrate.jsx`) {
          return await plugin.renderer?.hydrate.content(
            componentModuleId,
            domElementSelector ?? '#app'
          )
        } else if (moduleId === `${componentModuleId}`) {
          return `
          import React from "react";

          export default function() {
            return <div>Hello world</div>
          }
          `
        }
      },
    },
    ...((plugin.renderer?.plugins ?? []) as RollupPlugin[]),
  ]
}

async function getViteServer(
  plugin: Plugin,
  componentModuleId: string,
  domElementSelector?: string
) {
  const packageRoot = (await findPathUp('plugin-react', {
    type: 'directory',
    cwd: moduleDirname(import.meta.url),
  })) as string
  return await createServer({
    root: packageRoot,
    cacheDir: undefined,
    logLevel: 'silent',
    server: {
      middlewareMode: 'ssr',
    },
    clearScreen: false,
    optimizeDeps: {
      entries: [],
    },
    plugins: getRollupPlugins(plugin, componentModuleId, domElementSelector),
  })
}
