import { app } from '@gestaltjs/core/cli'
import logger from '../logger'
import express from 'express'

async function dev(app: app.App) {
  //console.log(`Serving app: ${app.name}`)

  const server = express()
  const port = 3000

  server.get('/', (req, res) => {
    res.send(`Hello world from ${app.configuration.name}`)
  })

  server.listen(port, () => {
    logger().log(`${app.configuration.name} being served on port ${port}`)
  })
}

export default dev
