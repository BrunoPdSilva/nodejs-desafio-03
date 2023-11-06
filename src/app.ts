import fastifyCookie from "@fastify/cookie"
import fastifyJwt from "@fastify/jwt"
import fastify from "fastify"
import { env } from "./env"
import { orgRoutes } from "./http/routes/org"
import { petsRoutes } from "./http/routes/pets"

export const app = fastify()

app.register(fastifyCookie)
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(orgRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _, res) => {
  console.error(`🔴 Internal Server Error:\n${error}`)

  return res.status(500).send({ error: `Internal Server error` })
})
