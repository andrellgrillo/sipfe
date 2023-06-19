import { InvalidCredentialsError } from '@/models/use-cases/errors/invalid_credentials'
import { makeAuthenticateUseCase } from '@/models/use-cases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(req: FastifyRequest, rep: FastifyReply) {
  const authenticateBodySchema = z.object({
    username: z.string(),
    password: z.string().min(9),
  })
  const { username, password } = authenticateBodySchema.parse(req.body)
  try {
    const authenticateUserCase = makeAuthenticateUseCase()
    const { user } = await authenticateUserCase.execute({
      username,
      password,
    })
    const token = await rep.jwtSign(
      {
        role: user.userRole,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    )
    const rtPlanexcon = await rep.jwtSign(
      {
        role: user.userRole,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '2d',
        },
      },
    )
    return rep
      .setCookie('rtPlanexcon', rtPlanexcon, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return rep.status(400).send({ message: err.message })
    }
  }
}
