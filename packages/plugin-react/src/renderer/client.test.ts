import { describe, test, expect, vi } from 'vitest'
import { clientRenderer } from './client'
import ReactDOM from 'react-dom'
import { ClientRenderer } from '@gestaltjs/plugins'

vi.mock('react-dom')

describe('hydrate', () => {
  test('hydrates using ReactDOM', () => {
    // Given/When
    const renderer = clientRenderer as ClientRenderer
    const component = vi.fn()
    const domElement: any = vi.fn()

    // When
    renderer.hydrate(component, domElement)

    // Then
    expect(ReactDOM.hydrate).toHaveBeenCalledWith(component, domElement)
  })
})
