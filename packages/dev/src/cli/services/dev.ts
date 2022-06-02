
import { project as projectModule, logger, error, project, vite } from '@gestaltjs/core/cli'
import { devLogger } from '../logger'
import { createApp } from 'h3'
import { listen } from 'listhen'
import { createBuildTool } from '@gestaltjs/core/node/build-tool'

type DevProjectOutput = {
  onChange: (project: project.models.Project) => void
}

export async function devProject({
  project,
  targetName,
}: {
  project: projectModule.models.Project
  targetName: string
  }): Promise<DevProjectOutput> {
  const buildTool = await createBuildTool(project)
  const target = project.targets.main[targetName]
  if (!target) {
    const availableTargets = Object.keys(
      project.targets.main
    ).join(', ')
    throw new error.Abort(
      `The target ${targetName} could not be found in the project`,
      {
        next: `Try running the command again with any of the following targets: ${availableTargets}`,
      }
    )
  }
  const app = createApp()
  //app.use(buildTool.middlewares)


  app.use('*', async (req: any) => {
    return await buildTool.ssr(req.url)
  })

  devLogger().info('Starting the project...')
  const listener = await listen(app, { autoClose: true, showURL: false })
  devLogger().info(
    logger.content`The project is now available at: ${logger.urlToken(
      listener.url,
      listener.url
    )}`
  )
  devLogger().info(logger.content`You can press CTRL+C to open the project.`)

  return {
    onChange: (changedProject) => {
      project = changedProject
    },
  }
}

async function getViteDevServer(
  project: projectModule.Project
): Promise<vite.ViteDevServer> {
  return vite.createServer({
    root: project.directory,
    cacheDir: undefined,
    server: {
      middlewareMode: 'ssr',
      hmr: true,
      watch: {
        // During tests we edit the files too fast and sometimes chokidar
        // misses change events, so enforce polling for consistency
        usePolling: true,
        interval: 100,
      },
    },
    clearScreen: false,
    logLevel: 'silent',
    plugins: [
      ...(project.configuration.plugins ?? []).flatMap(
        (plugin) => plugin.renderer?.vitePlugins ?? []
      ),
    ],
  })
}

async function render(options: {
  urlPath: string
  project: projectModule.Project
  target: projectModule.MainTarget
  viteDevServer: vite.ViteDevServer
}): Promise<string> {
  const plugins = options.project.configuration.plugins ?? []
  const route = options.target.router.lookup(options.urlPath)
  if (!route) {
    return `<div>${options.urlPath} not found</div>`
  }
  const renderer = plugins.find((plugin) =>
    plugin.renderer?.fileExtensions?.includes(route.fileExtension)
  )?.renderer
  if (!renderer) {
    return `<div> We could not find a plugin to handle the extension ${route.fileExtension}</div>`
  }
  const component = (
    await options.viteDevServer.ssrLoadModule(route.filePath)
  ).default()
  // TODO: Throw a good error if .default doesn't exist

  const routeHTML = (await renderer.server.render(component)).html
  const htmlDocument = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    ${routeHTML}
  </body>
</html>
  `
  return await options.viteDevServer.transformIndexHtml(
    options.urlPath,
    htmlDocument
  )
}
