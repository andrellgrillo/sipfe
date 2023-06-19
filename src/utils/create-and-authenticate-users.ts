import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin: false,
) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      username: 'johndoe',
      password_hash: await hash('123456789', 6),
      userRole: isAdmin ? 'Admin' : 'Usuario',
    },
  })

  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'johndoe@example.com',
    username: 'johndoe',
    password: '123456789',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    username: 'johndoe',
    password: '123456789',
  })
  const { token } = authResponse.body
  return { token }
}
