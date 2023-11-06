import { OrgNotFoundError } from "@/use-cases/errors"
import { makeRegisterPetUseCase } from "@/use-cases/factories/make-register-pet-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function register(req: FastifyRequest, res: FastifyReply) {
  try {
    const registerPetSchema = z.object({
      name: z.string(),
      age: z.string(),
      description: z.string(),
      independence: z.string(),
      energy: z.number(),
      size: z.string(),
      space_required: z.string(),
      requirements: z.string().array(),
    })

    const data = registerPetSchema.parse(req.body)

    const useCase = makeRegisterPetUseCase()

    const { pet } = await useCase.execute(data, req.user.sub)

    return res.status(201).send({ pet })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send({ error: "Dados para cadastro incorretos. " })
    }

    if (error instanceof OrgNotFoundError) {
      return res.status(400).send({ error: error.message })
    }

    console.log(error)

    throw error
  }
}
