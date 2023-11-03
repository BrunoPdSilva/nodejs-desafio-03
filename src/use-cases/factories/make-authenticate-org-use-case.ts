import { PrismaORGsRepository } from "@/repositories/prisma/prisma-orgs-repository"
import { AuthenticateOrgUseCase } from "../org/authenticate-org-use-case"

export function makeAuthenticateOrgUseCase() {
  const orgsRepository = new PrismaORGsRepository()
  const useCase = new AuthenticateOrgUseCase(orgsRepository)
  return useCase
}
