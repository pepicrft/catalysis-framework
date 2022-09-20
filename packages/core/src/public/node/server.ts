import Fastify from 'fastify'
import type { FastifyInstance } from 'fastify'

export class Server {
  instance: FastifyInstance

  constructor() {
    this.instance = Fastify({ logger: true })
  }

  async listen(port: string | number) {
    this.instance.listen(port)
  }
}
