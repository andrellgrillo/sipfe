import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-users'

describe('Read All Clients (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list clients', async () => {
    const { token } = await createAndAuthenticateUser(app, false)
    await request(app.server)
      .post('/client')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Modelo 01',
        shortName: 'ModCli',
        cnpj: '11111111111111',
        treatment: 'SR',
        resp: 'Modelo',
      })
    await request(app.server)
      .post('/client')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Modelo 02',
        shortName: 'ModCli2',
        cnpj: '11111111111112',
        treatment: 'SRA',
        resp: 'Modelo 02',
      })

    const response = await request(app.server)
      .get('/clients')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.clients.length).toBeGreaterThan(1)
  })
})
