import { PrismaClientsRepository } from '@/repositories/prisma/prisma-clients-repositories'
import { ReadAllClientsUseCase } from '../clients/read-all-clients'

export function makeReadAllClientsUseCase() {
  const clientsRepository = new PrismaClientsRepository()
  const useCase = new ReadAllClientsUseCase(clientsRepository)
  return useCase
}
