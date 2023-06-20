import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { ClientAlreadyExistsError } from '@/models/use-cases/errors/client-already-exists-error'
import { ShortnameAlreadyExistsError } from '@/models/use-cases/errors/shortname-already-exists-error'
import { makeCreateClientUseCase } from '@/models/use-cases/factories/make-create-client-use-case'

export async function create(req: FastifyRequest, rep: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    shortName: z.string().min(4).max(30),
    cnpj: z.string(),
    treatment: z.enum(['SR', 'SRA', 'DR', 'DRA']),
    resp: z.string(),
  })
  const { name, shortName, cnpj, treatment, resp } = createBodySchema.parse(
    req.body,
  )

  try {
    const createUseCase = makeCreateClientUseCase()
    await createUseCase.execute({
      name,
      shortName,
      cnpj,
      treatment,
      resp,
    })
  } catch (err) {
    if (err instanceof ClientAlreadyExistsError) {
      return rep.status(409).send({ message: err.message })
    }
    if (err instanceof ShortnameAlreadyExistsError) {
      return rep.status(409).send({ message: err.message })
    }
    return rep.status(500).send()
  }
  return rep.status(201).send()
}
