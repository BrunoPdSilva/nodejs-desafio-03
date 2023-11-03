import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"
import { PetDetailsUseCase } from "../pets/pet-details-use-case"

export function makePetDetailsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new PetDetailsUseCase(petsRepository)
  return useCase
}
