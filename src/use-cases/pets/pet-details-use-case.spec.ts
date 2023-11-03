import { PetsRepository } from "@/repositories/pets-repository"
import { describe, it, expect, beforeEach } from "vitest"
import { PetDetailsUseCase } from "./pet-details-use-case"
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository"
import { PetNotFoundError } from "../errors"

describe("Pet Details [Unit]", () => {
  let petsRepository: PetsRepository
  let useCase: PetDetailsUseCase

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    useCase = new PetDetailsUseCase(petsRepository)
  })

  it("should be able to see details of a pet", async () => {
    const petRegistered = await petsRepository.register({
      orgId: "1478",
      name: "JuJu",
      age: "3 anos",
      description: "Uma gatinha muito amorosa e companheira",
      independence: "Baixa",
      energy: 4,
      size: "Pequena",
      space_required: "Médio",
      requirements: ["Muita comida e amor"],
    })

    const { pet } = await useCase.execute(petRegistered.id)

    expect(pet).toEqual(
      expect.objectContaining({ orgId: "1478", name: "JuJu", age: "3 anos" })
    )
  })

  it("should trigger an error if the pet isn't found", async () => {
    await expect(useCase.execute("123")).rejects.toBeInstanceOf(
      PetNotFoundError
    )
  })
})
