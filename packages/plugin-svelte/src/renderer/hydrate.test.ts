import { describe, test, expect, vi } from 'vitest'
import { hydrate } from './hydrate'

describe('hydrate', () => {
  test('returns the right extension', async () => {
    expect(hydrate.extension).toEqual('js')
  })

  test('returns the right content', async () => {
    expect(hydrate.content('test-component.svelte', '#app'))
      .toMatchInlineSnapshot(`
      "
        import ComponentToHydrate from 'test-component.svelte';

        const domElement = document.querySelector('#app');
        new ComponentToHydrate({
          target: domElement,
          props: {},
        })
        "
    `)
  })
})
