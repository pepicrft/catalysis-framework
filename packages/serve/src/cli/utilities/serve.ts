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
            // 1. Read index.html
            // Here I´m trying to find the index.html in ./example
            const pathToIndex: string | undefined = await findUp('index.html')

            let template = fs.readFileSync(
                path.join(pathToIndex, 'index.html'),
              'utf-8'
            )

            // 2. Apply Vite HTML transforms.
            template = await vite.transformIndexHtml(url, template)

            // 3. Load the server entry.
            const { render } = await vite.ssrLoadModule('/src/entry-server.js')

            // 4. render the app HTML. This assumes entry-server.js's exported `render`
            //    function calls appropriate framework SSR APIs,
            //    e.g. ReactDOMServer.renderToString()
            const appHtml = await render(url)

            // 5. Inject the app-rendered HTML into the template.
            const html = template.replace(`<!--ssr-outlet-->`, appHtml)

            // 6. Send the rendered HTML back.
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
