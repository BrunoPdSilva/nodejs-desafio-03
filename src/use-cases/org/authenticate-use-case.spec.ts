import { describe, it, expect, beforeEach } from "vitest"
import { InMemoryORGsRepository } from "@/repositories/in-memory.ts/in-memory-orgs-repository"
import { ORGsRepository } from "@/repositories/orgs-repository"
import { AuthenticateUseCase } from "./authenticate-use-case"
import { InvalidCredentialsError } from "../errors"
import { hash } from "bcryptjs"

describe("Authenticate ORG - [Unit]", () => {
  let orgsRepository: ORGsRepository
  let useCase: AuthenticateUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryORGsRepository()
    useCase = new AuthenticateUseCase(orgsRepository)
  })

  it("should be able to authenticate as an org.", async () => {
    await orgsRepository.register({
      name: "Fundação SRP",
      representative: "Selma Peres",
      email: "srp_fundation@gmail.com",
      password: await hash("7439", 6),
      contact: "0800 7008",
      state: "SP",
      city: "Sorocaba",
      street: "Rua da Fundação",
      zipcode: "18078600",
    })

    const { org } = await useCase.execute({
      email: "srp_fundation@gmail.com",
      password: "7439",
    })

    expect(org).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: "srp_fundation@gmail.com",
      })
    )
  })

  it("should trigger an error if email is incorrect.", async () => {
    await orgsRepository.register({
      name: "Fundação SRP",
      representative: "Selma Peres",
      email: "srp_fundation@gmail.com",
      password: await hash("7439", 6),
      contact: "0800 7008",
      state: "SP",
      city: "Sorocaba",
      street: "Rua da Fundação",
      zipcode: "18078600",
    })

    await expect(
      useCase.execute({
        email: "sp_fundation@gmail.com",
        password: "7439",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("should trigger an error if password doesn't match.", async () => {
    await orgsRepository.register({
      name: "Fundação SRP",
      representative: "Selma Peres",
      email: "srp_fundation@gmail.com",
      password: await hash("7439", 6),
      contact: "0800 7008",
      state: "SP",
      city: "Sorocaba",
      street: "Rua da Fundação",
      zipcode: "18078600",
    })

    await expect(
      useCase.execute({
        email: "srp_fundation@gmail.com",
        password: "7438",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
