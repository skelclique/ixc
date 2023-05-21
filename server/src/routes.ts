import { FastifyInstance } from 'fastify'
import { handleLog } from './app'

export async function routes(app: FastifyInstance) {
  app.get('/', async (request, response) => {
    response.send(handleLog())
  })
}
