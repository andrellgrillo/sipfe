import { Prisma, Client } from '@prisma/client'

export interface ClientsRepository {
  create(data: Prisma.ClientCreateInput): Promise<Client>
}

// findById(id: string): Promise<User | null>
// findByEmail(email: string): Promise<User | null>
// findByUsername(username: string): Promise<User | null>
// create(data: Prisma.UserCreateInput): Promise<User>
