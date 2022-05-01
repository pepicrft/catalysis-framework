import { describe, test, expect, vi } from 'vitest'
import { serverRenderer } from './server'
import ReactDOMServer from 'react-dom/server'
import { ServerRenderer } from '@gestaltjs/plugins'

vi.mock('react-dom/server')

describe('hydrate', () => {
  test('hydrates using ReactDOM', () => {
    // Given/When
    const renderer = serverRenderer as ServerRenderer
    const component = vi.fn()

    // When
    renderer.render(component)

    // Then
    expect(ReactDOMServer.renderToString).toHaveBeenCalledWith(component)
  })
})
