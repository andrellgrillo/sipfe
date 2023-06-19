import { FastifyInstance } from 'fastify'
import { verifyJWT } from './middlewares/verify-jwt'

import { register } from './models/controllers/users/register'
import { authenticate } from './models/controllers/users/authenticate'
import { refresh } from './models/controllers/users/refresh'
import { profile } from './models/controllers/users/profile'

export async function routes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)

  /** ROTAS AUTENTICADAS */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
