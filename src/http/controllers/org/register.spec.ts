import { describe, it, expect, beforeAll, afterAll } from "vitest"
import { app } from "@/app"
import supertest from "supertest"

describe("Register ORG [E2E]", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to register as an org.", async () => {
    const response = await supertest(app.server)
      .post("/register")
      .send({
        name: "Fundação SRP",
        email: "srp_fundation@gmail.com",
        password: "743974",
        representative: "Selma Peres",
        contact: "0800 7008",
        state: "SP",
        city: "Sorocaba",
        street: "Rua da Fundação",
        zipcode: "18078600",
      })
      .expect(201)

    expect(response.body.org).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      })
    )
  })
})
