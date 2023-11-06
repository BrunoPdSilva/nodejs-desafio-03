import { describe, it, expect, beforeAll, afterAll } from "vitest"
import { app } from "@/app"
import supertest from "supertest"

describe("Pet Details [E2E]", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to see details of an pet.", async () => {
    await supertest(app.server)
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

    const authResponse = await supertest(app.server)
      .post("/authenticate")
      .send({
        email: "srp_fundation@gmail.com",
        password: "743974",
      })
      .expect(200)

    const { token } = authResponse.body

    const registerPetResponse = await supertest(app.server)
      .post("/pets/register")
      .send({
        name: "JuJu",
        age: "3 anos",
        description: "Uma gatinha muito amorosa e companheira",
        independence: "Baixa",
        energy: 4,
        size: "Pequena",
        space_required: "Médio",
        requirements: ["Muita comida e amor"],
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(201)

    const { id } = registerPetResponse.body.pet

    const response = await supertest(app.server)
      .get(`/pets/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)

    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: "JuJu",
        age: "3 anos",
        description: "Uma gatinha muito amorosa e companheira",
        independence: "Baixa",
        energy: 4,
        size: "Pequena",
        space_required: "Médio",
        requirements: ["Muita comida e amor"],
      })
    )
  })
})
