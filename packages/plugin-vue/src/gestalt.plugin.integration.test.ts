import VuePlugin from './gestalt.plugin'
import { describe, expect, test } from 'vitest'
import { createServer } from 'vite'
import { path, Plugin } from '@gestaltjs/plugins'
import { Plugin as RollupPlugin } from 'rollup'

describe('plugin', () => {
  test('ssr', async () => {
    // Given
    const plugin = await VuePlugin()
    const viteServer = await getViteServer(plugin, 'component.vue')

    // When
    const got = await (await viteServer.ssrLoadModule('ssr')).default()

    // Then
    expect(got).toMatchInlineSnapshot('"<div>Hello world</div>"')
  })
})

function getRollupPlugins(
  plugin: Plugin,
  componentModuleId: string,
  domElementSelector?: string
): RollupPlugin[] {
  return [
    {
      name: 'vue-plugin',
      resolveId: (moduleId: string) => {
        if (moduleId === 'ssr') {
          const extension = plugin.renderer?.ssr.extension ?? 'js'
          return `\0ssr.${extension}`
        } else if (moduleId === 'hydrate') {
          const extension = plugin.renderer?.ssr.extension ?? 'js'
          return `\0hydrate.${extension}`
        } else if (moduleId === componentModuleId) {
          return `${componentModuleId}`
        }
        return undefined
      },
      load: async (moduleId: string) => {
        if (moduleId === `\0ssr.js`) {
          return await plugin.renderer?.ssr.content(componentModuleId)
        } else if (moduleId === `\0hydrate.js`) {
          return await plugin.renderer?.hydrate.content(
            componentModuleId,
            domElementSelector ?? '#app'
          )
        } else if (moduleId === `${componentModuleId}`) {
          return `
          <script setup>
          </script>
          <template>
          <div>Hello world</div>
          </template>
          <style>
          </style>
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
  const packageRoot = (await path.findUp('plugin-vue', {
    type: 'directory',
    cwd: path.moduleDirname(import.meta.url),
  })) as string
  return await createServer({
    root: packageRoot,
    cacheDir: undefined,
    server: {
      middlewareMode: 'ssr',
    },
    clearScreen: false,
    resolve: {
      extensions: ['.vue'],
    },
    optimizeDeps: {
      entries: [],
    },
    plugins: getRollupPlugins(plugin, componentModuleId, domElementSelector),
  })
}
