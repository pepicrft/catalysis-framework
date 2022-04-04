import Fastify from 'fastify'
import { vite, path } from '@gestaltjs/core/cli'
import FastifyExpress from 'fastify-express'
export default async function dev(appPath: string) {
  const fastify = Fastify({
    logger: true
  })

  const viteServer = await vite.createServer({
    server: { middlewareMode: 'ssr' },
    plugins: []
  })
  await fastify.register(FastifyExpress)
  fastify.use(viteServer.middlewares)

  fastify.get('*', async function (request, reply) {
    const url = request.url
    try {
      let template = `
      <!DOCTYPE html>
      <html lang="en">

      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite App</title>
      </head>

      <body>
       <!--ssr-outlet-->
      </body>
      </html>
      `

      template = await viteServer.transformIndexHtml(url, template)
      const staticRendererPath = await path.findUp('render/static.js')
      const { render } = await viteServer.ssrLoadModule(staticRendererPath as string)

      const appHtml = await render(url)

      const html = template.replace(`<!--ssr-outlet-->`, appHtml)

      reply.status(200).header('Content-Type', 'text/html').send(html)
    } catch (error: any) {
      viteServer.ssrFixStacktrace(error)
    }
  })


  // Run the server!
  fastify.listen(3000, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    // Server is now listening on ${address}
  })


}
