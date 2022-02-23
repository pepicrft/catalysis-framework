import { app } from '@gestaltjs/core/cli'
import express from 'express'

async function serve(app: app.App) {
  //console.log(`Serving app: ${app.name}`)

  const server = express()
  const port = 3000

  server.get('/', (req, res) => {
    res.send(`Hello world from ${app.configuration.name}`)
  })

  server.listen(port, () => {
    console.log(`${app.configuration.name} being served on port ${port}`)
  })
}

export default serve
