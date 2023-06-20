import { Client, Prisma } from '@prisma/client'
import { ClientsRepository } from '../clients-repository'
import { randomUUID } from 'crypto'

export class InMemoryClientsRepository implements ClientsRepository {
  public items: Client[] = []

  async create(data: Prisma.ClientCreateInput) {
    const client = {
      id: randomUUID(),
      name: data.name,
      shortName: data.shortName,
      cnpj: data.cnpj,
      treatment: data.treatment,
      resp: data.resp,
      active: data.active,
    }
    this.items.push(client)
    return client
  }
}
