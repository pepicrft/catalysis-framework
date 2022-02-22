import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { App } from './App'

export function render(url: string) {
  const isReact = true
  const isVue = false

  if (isReact) {
    return ReactDOMServer.renderToString(
      <React.StrictMode>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </React.StrictMode>
    )
  } else if (isVue) {
    //TODO: implement render for Vue
  }
}
