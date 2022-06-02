import { Project } from '../cli/project/models/project'
import { createServer, ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import { error } from '@gestaltjs/core/cli'
import { joinPath, moduleDirname } from './path'

type SSROptions = {
  targetName: string
}

export class BuildTool {
  private project: Project
  private viteDevServer: ViteDevServer
  constructor(project: Project, viteDevServer: ViteDevServer) {
    this.project = project
    this.viteDevServer = viteDevServer
  }

  private getMainTarget(name: string) {
    return this.project.targets.main[name]
  }

  async ssr(path: string, options: SSROptions) {
    const target = this.getMainTarget(options.targetName)
    if (!target) {
      const availableTargets = Object.keys(this.project.targets.main).join(', ')
      throw new error.Abort(
        `The target ${options.targetName} could not be found in the project`,
        {
          next: `Try running the command again with any of the following targets: ${availableTargets}`,
        }
      )
    }

    const route = target.router.lookup(path)
    if (!route) {
      return `<div>There's no component for path ${path}</div>`
    }

    const renderRoute = (
      await this.viteDevServer.ssrLoadModule(
        `@gestalt/project/routes/${route.moduleFilePath}`
      )
    ).default

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vite App</title>
    </head>
    <body>
      ${await renderRoute()}
    </body>
  </html>
    `
  }
}

export async function createBuildTool(project: Project): Promise<BuildTool> {
  console.log(
    joinPath(
      moduleDirname(import.meta.url),
      '../../node_modules/react-dom/server.js'
    )
  )
  const viteDevServer = await createServer({
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
    resolve: {
      alias: [
        {
          find: 'react-dom/server',
          replacement: joinPath(
            moduleDirname(import.meta.url),
            '../../node_modules/react-dom/server.js'
          ),
        },
      ],
    },
    clearScreen: false,
    logLevel: 'silent',
    plugins: [
      {
        name: 'gestalt',
        resolveId: (moduleId: string) => {
          if (moduleId.startsWith('@gestalt/project/routes/')) {
            return moduleId
          }
          return undefined
        },
        load: async (moduleId: string) => {
          if (moduleId.startsWith('@gestalt/project/routes/')) {
            const componentModuleId = moduleId.replace(
              '@gestalt/project/routes/',
              ''
            )
            return `
            import ReactDOMServer from 'react-dom/server';
            import ComponentToRender from '${componentModuleId}';

            export default async function () {
              return await ReactDOMServer.renderToString(<ComponentToRender/>)
            }
            `
          }
        },
      },
      react(),
    ],
  })
  return new BuildTool(project, viteDevServer)
}
