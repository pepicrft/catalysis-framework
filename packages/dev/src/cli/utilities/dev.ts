import { project } from '@gestaltjs/core/cli'
import logger from '../logger'
import express from 'express'

async function dev(project: project.Project) {
  //console.log(`Serving app: ${app.name}`)

  const server = express()
  const port = 3000

  server.get('/', (req, res) => {
    res.send(`Hello world from ${project.configuration.name}`)
  })

  server.listen(port, () => {
    logger().log(`${project.configuration.name} being served on port ${port}`)
  })
}

export default dev
