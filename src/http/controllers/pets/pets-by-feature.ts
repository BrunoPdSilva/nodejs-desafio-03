import { PetsNotFoundError } from "@/use-cases/errors"
import { makeFetchPetsByFeatures } from "@/use-cases/factories/make-fetch-pets-by-features"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function fetchPetsByFeatures(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const querySchema = z.object({
      name: z.string().optional(),
      age: z.string().optional(),
      independence: z.string().optional(),
      size: z.string().optional(),
      energy: z.coerce.number().optional(),
      space_required: z.string().optional(),
    })

    const query = querySchema.parse(req.query)
    const useCase = makeFetchPetsByFeatures()
    const { pets } = await useCase.execute(query)

    return res.status(200).send({ pets })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send({ error: "Características inválidas. " })
    }

    if (error instanceof PetsNotFoundError) {
      return res.status(404).send({
        error: "Não encontramos nenhum pet com essas características. ",
      })
    }
  }
}
