import { FastifyInstance } from "fastify"
import { register } from "../controllers/pets/register"
import { verifyJWT } from "../middleware/verifyJWT"
import { petDetails } from "../controllers/pets/pet-details"
import { petsAvailableOnCity } from "../controllers/pets/pets-available-on-city"
import { fetchPetsByFeatures } from "../controllers/pets/pets-by-feature"

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets/register", { onRequest: [verifyJWT] }, register)
  app.get(`/pets/:petId`, petDetails)
  app.get(`/pets`, petsAvailableOnCity)
  app.get("/pets/features", fetchPetsByFeatures)
}
