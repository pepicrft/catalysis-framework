import { describe, test, expect } from 'vitest'
import { ssr } from './ssr'

describe('ssr', () => {
  test('content', () => {
    // When
    const got = ssr.content('component-id')

    // Then
    expect(got).toMatchInlineSnapshot(`
      "
          import ReactDOMServer from 'react-dom/server';
          import ComponentToRender from 'component-id';

          export default async function () {
            return await ReactDOMServer.renderToString(<ComponentToRender/>)
          }
          "
    `)
  })

  test('extension', () => {
    // When
    const got = ssr.extension

    // Then
    expect(got).toEqual('jsx')
  })
})
