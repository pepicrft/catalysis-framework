import { describe, test, expect, vi } from 'vitest'
import { clientRenderer } from './client'
import { ClientRenderer } from '@gestaltjs/plugins'

class SvelteComponent {
  target: any
  props: any

  constructor(options: any) {
    this.target = options.target
    this.props = options.props
  }
}

describe('hydrate', () => {
  test('creates a new instance using the component class', async () => {
    // Given
    const renderer = clientRenderer as ClientRenderer
    const domElement: any = vi.fn()

    // When
    await renderer.hydrate(SvelteComponent, domElement)
  })
})
