import { project } from '@gestaltjs/core/cli'
import { devLogger } from '../logger'
import express from 'express'

export async function devProject(project: project.Project) {
  const server = express()
  const port = 3000

  server.get('/', (req, res) => {
    res.send(`Hello world from ${project.configuration.name}`)
  })

  server.listen(port, () => {
    devLogger().info(
      `${project.configuration.name} being served on port ${port}`
    )
  })
}
