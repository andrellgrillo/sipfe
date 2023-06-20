import { ClientsRepository } from '@/repositories/clients-repository'
import { Client } from '@prisma/client'

type Treat = 'SR' | 'SRA' | 'DR' | 'DRA'

interface CreateClientUseCaseRequest {
  name: string
  shortName: string
  cnpj: string
  treatment: Treat
  resp: string
}

interface CreateClientUseCaseResponse {
  client: Client
}

export class CreateClientUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({
    name,
    shortName,
    cnpj,
    treatment,
    resp,
  }: CreateClientUseCaseRequest): Promise<CreateClientUseCaseResponse> {
    const client = await this.clientsRepository.create({
      name,
      shortName,
      cnpj,
      treatment,
      resp,
    })
    return {
      client,
    }
  }
}
