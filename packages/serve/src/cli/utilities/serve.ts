import { app, path } from '@gestaltjs/core/cli'
import express from 'express'
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { createServer } from 'vite'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function serve(app: app.App): Promise<void> {
  //console.log(`Serving app: ${app.name}`)

  const server = express()
  const port = 3000

  const vite = await createServer({
    server: { middlewareMode: 'ssr' },
  })

  server.use(vite.middlewares)

  server.use('*', async (req, res, next) => {
    //res.send(`Hello world from ${app.name}`)

    const url = req.originalUrl

    try {
      let template = `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Vite React App</title>
              </head>
              <body>
                <div id="app"><!--ssr-outlet--></div>
                <script type="module" src="/serve/entry-client.js"></script>
              </body>
            </html>
            `

      template = await vite.transformIndexHtml(url, template)
      const { render } = await vite.ssrLoadModule(
        path.join(__dirname, '../utilities/entry-server.js')
      )
      const context = {}
      const appHtml: string = await render(url, context)
      const html = template.replace(`<!--app-html-->`, appHtml)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      // If an error is caught, let Vite fix the stracktrace so it maps back to
      // your actual source code.
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  server.listen(port, () => {
    console.log(`${app.name} being served on port ${port}`)
  })
}

export default serve

//Vite Docs: https://vitejs.dev/guide/ssr.html#example-projects
