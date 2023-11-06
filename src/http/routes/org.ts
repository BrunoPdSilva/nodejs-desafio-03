import { FastifyInstance } from "fastify"
import { register } from "../controllers/org/register"
import { authenticate } from "../controllers/org/authenticate"

export async function orgRoutes(app: FastifyInstance) {
  app.post("/register", register)
  app.post("/authenticate", authenticate)
}
