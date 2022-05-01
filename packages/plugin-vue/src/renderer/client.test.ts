import { describe, test, expect, vi } from 'vitest'
import { createSSRApp } from 'vue'
import { clientRenderer } from './client'
import { ClientRenderer } from '@gestaltjs/plugins'

vi.mock('vue')

describe('hydrate', () => {
  test('delegates the creation and mounting to Vue', async () => {
    // Given
    const renderer = clientRenderer as ClientRenderer
    const component: any = vi.fn()
    const domElement: any = vi.fn()
    const app: any = { mount: vi.fn() }
    vi.mocked(createSSRApp).mockReturnValue(app)

    // When
    await renderer.hydrate(component, domElement)

    // Then
    expect(createSSRApp).toHaveBeenCalledWith(component)
    expect(app.mount).toHaveBeenCalledWith(domElement)
  })
})
