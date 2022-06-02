import {
  project as projectModule,
  logger,
  error,
  project,
  vite,
} from '@gestaltjs/core/cli'
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
  const app = createApp()
  //app.use(buildTool.middlewares)

  app.use('*', async (req: any) => {
    return await buildTool.ssr(req.url, { targetName })
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
