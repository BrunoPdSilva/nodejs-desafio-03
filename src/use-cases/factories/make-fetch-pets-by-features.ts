import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"
import { FetchPetsByFeatures } from "../pets/fetch-pets-by-features"

export function makeFetchPetsByFeatures() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FetchPetsByFeatures(petsRepository)
  return useCase
}
