import fastify from "fastify"

export const app = fastify()

app.setErrorHandler((error, _, res) => {
  console.error(error)

  return res.status(500).send({ error: `Internal Server error` })
})
