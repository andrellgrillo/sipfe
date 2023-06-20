import { PrismaClientsRepository } from '@/repositories/prisma/prisma-clients-repositories'
import { CreateClientUseCase } from '../create-client'

export function makeCreateClientUseCase() {
  const clientsRepository = new PrismaClientsRepository()
  const createClientUseCase = new CreateClientUseCase(clientsRepository)

  return createClientUseCase
}
