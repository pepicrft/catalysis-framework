import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { App } from './App.jsx'

//entry-server.jsx

export function render(url: string, context: any) {
  let isReact = true

  if (isReact) {
    return ReactDOMServer.renderToString(
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    )
  } elseif(isVue){
    //TODO: implement render for Vue
  }
}

//https://v5.reactrouter.com/web/api/StaticRouter
