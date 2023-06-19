import { FastifyRequest, FastifyReply } from 'fastify'

export async function refresh(req: FastifyRequest, rep: FastifyReply) {
  await req.jwtVerify({ onlyCookie: true })

  const { role } = req.user

  const token = await rep.jwtSign(
    {
      role,
    },
    {
      sign: {
        sub: req.user.sub,
      },
    },
  )

  const rtPlanexcon = await rep.jwtSign(
    {
      role,
    },
    {
      sign: {
        sub: req.user.sub,
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
    .send({
      token,
    })
}
