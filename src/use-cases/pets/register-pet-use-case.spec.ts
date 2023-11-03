import { PetsRepository } from "@/repositories/pets-repository"
import { describe, it, expect, beforeEach } from "vitest"
import { RegisterPetUseCase } from "./register-pet-use-case"
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository"
import { ORGsRepository } from "@/repositories/orgs-repository"
import { InMemoryORGsRepository } from "@/repositories/in-memory/in-memory-orgs-repository"
import { OrgNotFoundError } from "../errors"

describe("Register Pet [Unit]", () => {
  let orgsRepository: ORGsRepository
  let petsRepository: PetsRepository
  let useCase: RegisterPetUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryORGsRepository()
    petsRepository = new InMemoryPetsRepository()
    useCase = new RegisterPetUseCase(orgsRepository, petsRepository)
  })

  it("should be able to register a pet.", async () => {
    await orgsRepository.register({
      id: "47896",
      name: "Fundação SRP",
      representative: "Selma Peres",
      email: "srp_fundation@gmail.com",
      password: "7439",
      contact: "0800 7008",
      state: "SP",
      city: "Sorocaba",
      street: "Rua da Fundação",
      zipcode: "18078600",
    })

    const { pet } = await useCase.execute(
      {
        name: "JuJu",
        age: "3 anos",
        description: "Uma gatinha muito amorosa e companheira",
        independence: "Baixa",
        energy: 4,
        size: "Pequena",
        space_required: "Médio",
        requirements: ["Muita comida e amor"],
      },
      "47896"
    )

    expect(pet.id).toEqual(expect.any(String))
  })

  it("should trigger an error if the organization is not registered.", async () => {
    await expect(
      useCase.execute(
        {
          name: "JuJu",
          age: "3 anos",
          description: "Uma gatinha muito amorosa e companheira",
          independence: "Baixa",
          energy: 4,
          size: "Pequena",
          space_required: "Médio",
          requirements: ["Muita comida e amor"],
        },
        "47"
      )
    ).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})
