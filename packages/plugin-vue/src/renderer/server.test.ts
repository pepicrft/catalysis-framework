import { describe, test, expect, vi } from 'vitest'
import { createSSRApp } from 'vue'
import { serverRenderer } from './server'
import { renderToString } from 'vue/server-renderer'
import { ServerRenderer } from '@gestaltjs/plugins'

vi.mock('vue')
vi.mock('vue/server-renderer')

describe('hydrate', () => {
  test('delegates the creation and mounting to Vue', async () => {
    // Given
    const renderer = serverRenderer as ServerRenderer
    const component: any = vi.fn()
    const app: any = { mount: vi.fn() }
    const html = '<div>Test</div>'
    vi.mocked(createSSRApp).mockReturnValue(app)
    vi.mocked(renderToString).mockResolvedValue(html)

    // When
    const got = await renderer.render(component)

    // Then
    expect(got.html).toEqual(html)
    expect(createSSRApp).toHaveBeenCalledWith(component)
    expect(renderToString).toHaveBeenCalledWith(app, {})
  })
})
