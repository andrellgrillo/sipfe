import { FastifyRequest, FastifyReply } from 'fastify'

export async function verifyUserRole(
  roleToVerify: 'Admin' | 'Supervisor' | 'Moderador' | 'Usuario',
) {
  return async (req: FastifyRequest, rep: FastifyReply) => {
    const { role } = req.user

    if (role !== roleToVerify) {
      return rep.status(401).send({ message: 'Unauthorized.' })
    }
  }
}
