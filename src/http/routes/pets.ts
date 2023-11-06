import { FastifyInstance } from "fastify"
import { register } from "../controllers/pets/register"
import { verifyJWT } from "../middleware/verifyJWT"
import { petDetails } from "../controllers/pets/pet-details"

export async function petsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT)

  app.post("/pets/register", register)
  app.get(`/pets/:petId`, petDetails)
}
