import { FastifyRequest, FastifyReply } from 'fastify'
import { makeReadAllClientsUseCase } from '@/models/use-cases/factories/make-read-all-clients-use-case'

export async function readClients(req: FastifyRequest, rep: FastifyReply) {
  const readAllClientsUseCase = makeReadAllClientsUseCase()
  const { clients } = await readAllClientsUseCase.execute()
  return rep.status(200).send({ clients })
}
