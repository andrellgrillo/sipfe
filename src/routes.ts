import { FastifyInstance } from 'fastify'

export async function Routes(app: FastifyInstance) {
  app.get('/', () => {
    return 'olá'
  })
}
