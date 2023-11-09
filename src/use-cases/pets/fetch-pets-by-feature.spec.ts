import { PetsRepository } from "@/repositories/pets-repository"
import { describe, it, expect, beforeEach } from "vitest"
import { FetchPetsByFeatures } from "./fetch-pets-by-features"
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository"

describe("Fetch Pets By Feature", () => {
  let petsRepository: PetsRepository
  let useCase: FetchPetsByFeatures

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    useCase = new FetchPetsByFeatures(petsRepository)
  })

  it("should be able to fetch pets by it's features", async () => {
    await petsRepository.register({
      orgId: "1795",
      name: "JuJu",
      age: "3 anos",
      description: "Uma gatinha muito amorosa e companheira",
      independence: "Baixa",
      energy: 4,
      size: "Pequena",
      space_required: "Médio",
      requirements: ["Muita comida e amor"],
    })

    await petsRepository.register({
      orgId: "1795",
      name: "Paçoca",
      age: "3 anos",
      description: "Um gatinho muito companheiro e comportado.",
      independence: "Alta",
      energy: 5,
      size: "Pequena",
      space_required: "Médio",
      requirements: ["Muita comida e amor"],
    })

    const { pets } = await useCase.execute({
      independence: "Alta",
      energy: 5,
    })

    expect(pets).toHaveLength(1)
    expect(pets[0].name).toEqual("Paçoca")
  })
})
