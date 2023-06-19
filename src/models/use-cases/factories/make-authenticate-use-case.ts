import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repositories'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const userRepository = new PrismaUsersRepository()
  const authenticate = new AuthenticateUseCase(userRepository)

  return authenticate
}
