import { describe, test, expect, vi } from 'vitest'
import { hydrate } from './hydrate'

vi.mock('react-dom')

describe('hydrate', () => {
  test('content', async () => {
    // When
    const got = hydrate.content('component-id', '#app')

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

  test('extension', async () => {
    // When
    const got = hydrate.extension

    // Then
    expect(got).toEqual('jsx')
  })
})
