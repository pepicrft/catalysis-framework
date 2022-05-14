import { describe, test, expect, vi } from 'vitest'
import { clientRenderer } from './client'

vi.mock('react-dom')

describe('hydrate', () => {
  test('hydrates using ReactDOM', async () => {
    // Given/When
    const renderer = clientRenderer

    // When
    const got = await renderer.hydrate('component-id', '#app')

    // Then
    expect(got).toMatchInlineSnapshot(`
      "
          import ReactDOM from 'react-dom';
          import ComponentToHydrate from 'component-id';

          const domElement = document.querySelector('#app');
          ReactDOM.hydrate(<ComponentToHydrate/>, domElement);
          "
    `)
  })
})
