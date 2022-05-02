import { describe, test, expect, vi } from 'vitest'
import { serverRenderer } from './server'
import { ServerRenderer } from '@gestaltjs/plugins'

describe('hydrate', () => {
  test('delegates the creation and mounting to the component', async () => {
    // Given
    const renderer = serverRenderer as ServerRenderer
    const html = '<div>app</div>'
    const component: any = { render: () => ({ html }) }

    // When
    const got = await renderer.render(component)

    // Then
    expect(got.html).toEqual(html)
  })
})
