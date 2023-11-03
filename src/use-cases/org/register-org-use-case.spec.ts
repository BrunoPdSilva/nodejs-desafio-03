import { describe, it, expect, beforeEach } from "vitest"
import { InMemoryORGsRepository } from "@/repositories/in-memory.ts/in-memory-orgs-repository"
import { ORGsRepository } from "@/repositories/orgs-repository"
import { RegisterOrgUseCase } from "./register-org-use-case"
import {
  OrgWithSameEmailAlreadyExistsError,
  OrgWithSameNameAlreadyExistsError,
} from "../errors"

describe("Register ORG - [Unit]", () => {
  let orgsRepository: ORGsRepository
  let useCase: RegisterOrgUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryORGsRepository()
    useCase = new RegisterOrgUseCase(orgsRepository)
  })

  it("should be able to register an ORG", async () => {
    const { org } = await useCase.execute({
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

    expect(org).toEqual(
      expect.objectContaining({ id: expect.any(String), password: undefined })
    )
  })

  it("should trigger an error if a ORG with the same name already exists", async () => {
    await useCase.execute({
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

    await expect(
      useCase.execute({
        name: "Fundação SRP",
        representative: "Selma Peres",
        email: "srp_fundation2@gmail.com",
        password: "7439",
        contact: "0800 7008",
        state: "SP",
        city: "Sorocaba",
        street: "Rua da Fundação",
        zipcode: "18078600",
      })
    ).rejects.toBeInstanceOf(OrgWithSameNameAlreadyExistsError)
  })

  it("should trigger an error if a ORG with the same email already exists", async () => {
    await useCase.execute({
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

    await expect(
      useCase.execute({
        name: "Fundação SRP - Sede 2",
        representative: "Selma Peres",
        email: "srp_fundation@gmail.com",
        password: "7439",
        contact: "0800 7008",
        state: "SP",
        city: "Sorocaba",
        street: "Rua da Fundação",
        zipcode: "18078600",
      })
    ).rejects.toBeInstanceOf(OrgWithSameEmailAlreadyExistsError)
  })
})
