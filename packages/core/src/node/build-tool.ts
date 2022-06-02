import { Project } from '../cli/project/models/project'
import { createServer, ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'

export class BuildTool {

  private project: Project
  private viteDevServer: ViteDevServer
  constructor(project: Project, viteDevServer: ViteDevServer) {
    this.project = project
    this.viteDevServer = viteDevServer
  }

  async ssr(path: string) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vite App</title>
    </head>
    <body>
      ${path}
    </body>
  </html>
    `
  }

}


export async function createBuildTool(project: Project): Promise<BuildTool> {
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
    clearScreen: false,
    logLevel: 'silent',
    plugins: [react()],
  })
  return new BuildTool(project, viteDevServer)
}
