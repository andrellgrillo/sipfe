import { FastifyInstance } from 'fastify'
import { register } from './models/controllers/users/register'

export async function Routes(app: FastifyInstance) {
  app.post('/users', register)
}
