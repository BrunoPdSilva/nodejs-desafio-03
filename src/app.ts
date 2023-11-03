import fastifyCookie from "@fastify/cookie"
import fastifyJwt from "@fastify/jwt"
import fastify from "fastify"
import { env } from "./env"

export const app = fastify()

app.register(fastifyCookie)
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.setErrorHandler((error, _, res) => {
  console.error(`🔴 Internal Server Error:\n${error}`)

  return res.status(500).send({ error: `Internal Server error` })
})
