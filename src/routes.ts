import { FastifyInstance } from 'fastify'
import { verifyJWT } from './middlewares/verify-jwt'

import { register } from './models/controllers/users/register'
import { authenticate } from './models/controllers/users/authenticate'
import { refresh } from './models/controllers/users/refresh'
import { profile } from './models/controllers/users/profile'
import { readClients } from './models/controllers/clients/read'
import { createClient } from './models/controllers/clients/create'

export async function routes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)

  /** ROTAS AUTENTICADAS */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
  app.get('/clients', { onRequest: [verifyJWT] }, readClients)

  app.post('/client', { onRequest: [verifyJWT] }, createClient)
}
