import { describe, test, expect, vi } from 'vitest'
import { ssr } from './ssr'

describe('ssr', () => {
  test('returns the right extension', async () => {
    expect(ssr.extension).toEqual('js')
  })

  test('returns the right content', async () => {
    expect(ssr.content('test-component.svelte')).toMatchInlineSnapshot(`
      "
          import ComponentToRender from 'test-component.svelte';

          export default async function () {
            const { html } = ComponentToRender.render()
            return { html }
          }
          "
    `)
  })
})
