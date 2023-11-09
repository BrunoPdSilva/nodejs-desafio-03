import { PetsNotFoundError } from "@/use-cases/errors"
import { makePetsAvailableOnCityUseCase } from "@/use-cases/factories/make-pets-available-on-city-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function petsAvailableOnCity(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const querySchema = z.object({ city: z.string() })
    const { city } = querySchema.parse(req.query)
    const useCase = makePetsAvailableOnCityUseCase()
    const { pets } = await useCase.execute(city)

    return res.status(200).send({ pets })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send({ error: "A cidade informada é inválida." })
    }

    if (error instanceof PetsNotFoundError) {
      return res.status(404).send({ error: error.message })
    }

    throw error
  }
}
