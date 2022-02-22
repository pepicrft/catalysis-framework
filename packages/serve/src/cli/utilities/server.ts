import { app, path, fs } from '@gestaltjs/core/cli'
import express, { Express } from 'express'
import { createServer as createViteServer } from 'vite'
import { fileURLToPath } from 'url'

async function serve(app: app.App): Promise<void> {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))

  //Express server
  const server: Express = express()
  const port = 3000

  //Vite's connect instance as middleware
  const root = process.cwd()
  const vite = await createViteServer({
    root,
    logLevel: 'info',
    server: {
      middlewareMode: true,
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
  })

  server.use(vite.middlewares)

  server.use('*', async ({ originalUrl }, next) => {
    const url = originalUrl

    try {
      const template = fs.readFile(
        path.resolve(__dirname, 'index.html'),
        'utf-8'
      )

      const templateVite = await vite.transformIndexHtml(url, template)
      const { render } = (
        await vite.ssrLoadModule('/src/client/entry-server.tsx')
      ).render

      const appHtml: string = await render(url, context)
      const html = templateVite.replace(`<!--app-html-->`, appHtml)
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
