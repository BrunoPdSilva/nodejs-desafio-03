import { PetNotFoundError } from "@/use-cases/errors"
import { makePetDetailsUseCase } from "@/use-cases/factories/make-pet-details-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function petDetails(req: FastifyRequest, res: FastifyReply) {
  try {
    const paramsSchema = z.object({ petId: z.string().uuid() })
    const { petId } = paramsSchema.parse(req.params)
    const useCase = makePetDetailsUseCase()

    const { pet } = await useCase.execute(petId)

    return res.status(200).send({ pet })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send({ error: "Formato do ID inválido." })
    }

    if (error instanceof PetNotFoundError) {
      return res.status(404).send({ error: error.message })
    }

    throw error
  }
}
