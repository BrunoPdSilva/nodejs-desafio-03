import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"
import { PetsAvailableOnCityUseCase } from "../pets/pets-available-on-city-use-case"

export function makePetsAvailableOnCityUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new PetsAvailableOnCityUseCase(petsRepository)
  return useCase
}
