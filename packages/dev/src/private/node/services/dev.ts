import { Project } from '@gestaltjs/core/node/project'

import { urlToken, content } from '@gestaltjs/core/node/logger'

import { devLogger } from '../logger.js'
import { createApp, toNodeListener } from 'h3'
import { listen } from 'listhen'

type DevProjectOutput = {
  onChange: (project: Project) => void
}

export async function devProject(project: Project): Promise<DevProjectOutput> {
  const app = createApp()
  app.use('/', () => 'Hello world!')

  devLogger().info('Starting the project...')
  const listener = await listen(toNodeListener(app), {
    autoClose: true,
    showURL: false,
  })
  devLogger().info(
    content`The project is now available at: ${urlToken(
      listener.url,
      listener.url
    )}`
  )
  devLogger().info(content`You can press CTRL+C to open the project.`)

  return {
    onChange: (changedProject) => {
      project = changedProject
    },
  }
}
