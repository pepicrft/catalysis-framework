import { app } from '@gestaltjs/core/cli';
import path from 'pathe';
import fs from 'fs';
import { findUp } from 'find-up';
import express from 'express';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createServer: createViteServer } = require('vite');

async function serve(app: app.App): Promise<void> {
    //console.log(`Serving app: ${app.name}`)

    const server = express()
    const port = 3000;


    const vite = await createViteServer({
        server: { middlewareMode: 'ssr' }
      })

    server.use(vite.middlewares)

    server.use('*', async (req,res, next) => {
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
              </body>
            </html>
            `
            // <script type="module" src="/src/entry-client.jsx"></script>

            template = await vite.transformIndexHtml(url, template)
            const { render } = await vite.ssrLoadModule('./serve/ssr.ts')
            const appHtml: string = await render(url)
            const html = template.replace(`<!--ssr-outlet-->`, appHtml)
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

export default serve;

//Vite Docs: https://vitejs.dev/guide/ssr.html#example-projects
