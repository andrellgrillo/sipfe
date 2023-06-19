import { AuthenticateUseCase } from '@/models/use-cases/authenticate'
import { InvalidCredentialsError } from '@/models/use-cases/errors/invalid_credentials'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { describe, expect, it, beforeEach } from 'vitest'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      username: 'johndoe',
      password_hash: await hash('123456789', 6),
    })
    const { user } = await sut.execute({
      username: 'johndoe',
      password: '123456789',
    })
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with worng username', async () => {
    await expect(() =>
      sut.execute({
        username: 'johndoe',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      username: 'johndoe',
      password_hash: await hash('123456789', 6),
    })
    await expect(() =>
      sut.execute({
        username: 'johndoe',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
