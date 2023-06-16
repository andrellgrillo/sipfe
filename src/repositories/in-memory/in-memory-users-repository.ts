import { User, Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)
    if (!user) {
      return null
    }
    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)
    if (!user) {
      return null
    }
    return user
  }

  async findByUsername(username: string) {
    const user = this.items.find((item) => item.username === username)
    if (!user) {
      return null
    }
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      username: data.username,
      password_hash: data.password_hash,
    }
    this.items.push(user)
    return user
  }
}
