import { InMemoryClientsRepository } from '@/repositories/in-memory/in-memory-clients-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateClientUseCase } from './create-client'

let clientsRepository: InMemoryClientsRepository
let sut: CreateClientUseCase

describe('Create Client Use Case', () => {
  beforeEach(() => {
    clientsRepository = new InMemoryClientsRepository()
    sut = new CreateClientUseCase(clientsRepository)
  })

  it('should to create client', async () => {
    const { client } = await sut.execute({
      name: 'Modelo Cliente',
      shortName: 'ModCli',
      cnpj: '1111111111111111',
      treatment: 'DR',
      resp: 'Modelo',
    })
    expect(client.id).toEqual(expect.any(String))
  })
})
