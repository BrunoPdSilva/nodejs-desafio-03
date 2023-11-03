import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"
import { RegisterPetUseCase } from "../pets/register-pet-use-case"
import { PrismaORGsRepository } from "@/repositories/prisma/prisma-orgs-repository"

export function makeRegisterPetUseCase() {
  const orgsRepository = new PrismaORGsRepository()
  const petsRepository = new PrismaPetsRepository()
  const useCase = new RegisterPetUseCase(orgsRepository, petsRepository)
  return useCase
}
