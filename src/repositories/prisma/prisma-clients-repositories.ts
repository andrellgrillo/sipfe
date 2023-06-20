import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ClientsRepository } from '../clients-repository'

export class PrismaClientsRepository implements ClientsRepository {
  async create(data: Prisma.ClientCreateInput) {
    const client = await prisma.client.create({
      data,
    })
    return client
  }

  async findAll() {
    const clients = await prisma.client.findMany({
      orderBy: [
        {
          shortName: 'asc',
        },
      ],
    })
    return clients
  }
}
