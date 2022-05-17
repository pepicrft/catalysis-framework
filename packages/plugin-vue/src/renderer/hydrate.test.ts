import { describe, test, expect, vi } from 'vitest'
import { hydrate } from './hydrate'

vi.mock('vue')

describe('hydrate', () => {
  test('has the right extension', async () => {
    expect(hydrate.extension).toEqual('js')
  })
  test('has the right content', () => {
    expect(hydrate.content('test-component.vue', '#app'))
      .toMatchInlineSnapshot(`
      "
        import { createSSRApp } from 'vue'
        import ComponentToHydrate from 'test-component.vue';

        const domElement = document.querySelector('#app');
        const app = createSSRApp(ComponentToHydrate)
        app.mount(domElement)
        "
    `)
  })
})
