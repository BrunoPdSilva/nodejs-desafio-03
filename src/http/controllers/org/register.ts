import { FastifyReply, FastifyRequest } from "fastify"
import { makeRegisterOrgUseCase } from "@/use-cases/factories/make-register-org-use-case"
import { z } from "zod"
import {
  OrgWithSameEmailAlreadyExistsError,
  OrgWithSameNameAlreadyExistsError,
} from "@/use-cases/errors"

export async function register(req: FastifyRequest, res: FastifyReply) {
  try {
    const registerSchema = z.object({
      name: z.string().min(3),
      email: z.string().email(),
      contact: z.string().min(8),
      password: z.string().min(6),
      representative: z.string().min(3),
      state: z.string(),
      city: z.string(),
      zipcode: z.string(),
      street: z.string(),
    })

    const data = registerSchema.parse(req.body)

    const useCase = makeRegisterOrgUseCase()
    const { org } = await useCase.execute(data)

    return res.status(201).send({ org })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send({
        error: "Dados para registro inválidos.",
        issues: error.format(),
      })
    }

    if (error instanceof OrgWithSameNameAlreadyExistsError) {
      return res.status(400).send({ error: error.message })
    }

    if (error instanceof OrgWithSameEmailAlreadyExistsError) {
      return res.status(400).send({ error: error.message })
    }

    console.error(error)

    throw error
  }
}
