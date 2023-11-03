import { PrismaORGsRepository } from "@/repositories/prisma/prisma-orgs-repository"
import { RegisterOrgUseCase } from "../org/register-org-use-case"

export function makeRegisterOrgUseCase() {
  const orgsRepository = new PrismaORGsRepository()
  const useCase = new RegisterOrgUseCase(orgsRepository)
  return useCase
}
