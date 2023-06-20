import { Client } from '@prisma/client'
import { ClientsRepository } from '@/repositories/clients-repository'
import { ResourceNotFoundError } from '../errors/resources-not-found'

interface ReadAllClientsUseCaseResponse {
  clients: Client[]
}

export class ReadAllClientsUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute(): Promise<ReadAllClientsUseCaseResponse> {
    const clients = await this.clientsRepository.findAll()
    if (!clients) {
      throw new ResourceNotFoundError()
    }
    return { clients }
  }
}
