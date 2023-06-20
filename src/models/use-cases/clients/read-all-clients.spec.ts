import { InMemoryClientsRepository } from '@/repositories/in-memory/in-memory-clients-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { ReadAllClientsUseCase } from './read-all-clients'

let clientsRepository: InMemoryClientsRepository
let sut: ReadAllClientsUseCase

describe('Read All Clients Use Case', () => {
  beforeEach(async () => {
    clientsRepository = new InMemoryClientsRepository()
    sut = new ReadAllClientsUseCase(clientsRepository)
  })

  it('should be able to read all clients', async () => {
    await clientsRepository.create({
      name: 'Modelo Cliente 01',
      shortName: 'ModCli1',
      cnpj: '11111111111111',
      resp: 'Modelo 1',
      treatment: 'SR',
    })

    await clientsRepository.create({
      name: 'Modelo Cliente 02',
      shortName: 'ModCli2',
      cnpj: '22222222222222',
      resp: 'Modelo 2',
      treatment: 'DR',
    })

    const { clients } = await sut.execute()

    expect(clients.length).toBeGreaterThan(1)
  })
})
