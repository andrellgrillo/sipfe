import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-users'

describe('Create Client (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able create a client', async () => {
    const { token } = await createAndAuthenticateUser(app, false)

    const response = await request(app.server)
      .post('/client')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Modelo Client',
        shortName: 'ModCli',
        cnpj: '12345678911',
        treatment: 'SR',
        resp: 'Modelo',
      })
    expect(response.statusCode).toEqual(201)
  })
})
