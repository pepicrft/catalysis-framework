import { describe, test, expect } from 'vitest'
import { serverRenderer } from './server'

describe('render', () => {
  test('hydrates using ReactDOM', async () => {
    // Given/When
    const renderer = serverRenderer

    // When
    const got = await renderer.render('component-id')

    // Then
    expect(got).toMatchInlineSnapshot(`
      "
          import ReactDOMServer from 'react-dom/server';
          import ComponentToRender from 'component-id';

          export default async funcion () {
            return await ReactDOMServer.renderToString(<ComponentToRender/>)
          }
          "
    `)
  })
})
