import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/models/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/models/use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    username: z.string().min(6),
    password: z.string().min(9),
  })
  const { name, email, username, password } = registerBodySchema.parse(
    request.body,
  )

  try {
    const registerUseCase = makeRegisterUseCase()
    await registerUseCase.execute({
      name,
      email,
      username,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    return reply.status(500).send()
  }
  return reply.status(201).send()
}
