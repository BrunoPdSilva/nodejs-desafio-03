import { InvalidCredentialsError } from "@/use-cases/errors"
import { makeAuthenticateOrgUseCase } from "@/use-cases/factories/make-authenticate-org-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  try {
    const authenticateSchema = z.object({
      email: z.string().email(),
      password: z.string().min(3),
    })

    const { email, password } = authenticateSchema.parse(req.body)

    const useCase = makeAuthenticateOrgUseCase()

    const { org } = await useCase.execute({ email, password })

    const token = await res.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      }
    )

    return res.status(200).send({ token })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .send({ error: "Formato do email ou senha incorretos." })
    }

    if (error instanceof InvalidCredentialsError) {
      console.log("invalid credentials")
      return res.status(401).send({ error: error.message })
    }

    console.error(error)

    throw error
  }
}
