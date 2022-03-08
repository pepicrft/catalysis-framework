import { path } from '@gestaltjs/core/cli'
import fs from 'fs-extra'
import express, { Express, Request, Response } from 'express'
import { createServer as createViteServer } from 'vite'

//Vite Docs: https://vitejs.dev/guide/ssr.html#example-projects

async function createServer(root = __dirname): Promise<void> {
  const resolve = (p: string) => path.resolve(__dirname, p)

  //Express server
  const app: Express = express()
  const requestHandler = express.static(resolve('assets'))
  app.use(requestHandler)
  app.use('/assets', requestHandler)

  const vite = await createViteServer({
    root,
    logLevel: 'info',
    server: {
      middlewareMode: 'ssr',
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
  })

  //Use vite's connect instance as middleware
  app.use(vite.middlewares)

  app.use('*', async (req: Request, res: Response) => {
    try {
      const url = req.originalUrl
      let template
      template = fs.readFileSync(resolve('index.html'), 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      const render = (await vite.ssrLoadModule('/client/entry-server.tsx'))
        .render

      const context = {}
      const appHtml = render(url, context)

      const html = template.replace(`<!--app-html-->`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      // If an error is caught, let Vite fix the stracktrace so it maps back to
      // your actual source code.
      vite.ssrFixStacktrace(e as Error)
      console.log((e as Error).stack)

      res.status(500).end((e as Error).stack)
    }
  })

  return { app, vite }
}

createServer().then(({ app }) => {
  const port = process.env.PORT || 7456
  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`App is listening on http://localhost:${port}`)
  })
})
