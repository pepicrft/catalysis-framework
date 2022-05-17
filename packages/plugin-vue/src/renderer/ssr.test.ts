import { describe, test, expect, vi } from 'vitest'
import { ssr } from './ssr'

vi.mock('vue')
vi.mock('vue/server-renderer')

describe('ssr', () => {
  test('has the right extension', () => {
    expect(ssr.extension).toEqual('js')
  })

  test('has the right content', () => {
    expect(ssr.content('test-component.vue')).toMatchInlineSnapshot(`
      "
          import { createSSRApp } from 'vue'
          import { renderToString } from 'vue/server-renderer'
          import ComponentToRender from 'test-component.vue';

          export default async function() {
            const app = createSSRApp(ComponentToRender)
            const ctx = {}
            const html = await renderToString(app, ctx)
            return html
          }
          "
    `)
  })
})
