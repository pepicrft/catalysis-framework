import { project, logger } from '@gestaltjs/core/cli'
import { devLogger } from '../logger'
import { createApp } from 'h3'
import { listen } from 'listhen'

type DevProjectOutput = {
  onChange: (project: project.models.Project) => void
}

export async function devProject(
  project: project.models.Project
): Promise<DevProjectOutput> {
  const app = createApp()
  app.use('/', () => 'Hello world!')

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
