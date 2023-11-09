import { PetsRepository } from "@/repositories/pets-repository"
import { PetsNotFoundError } from "../errors"

export class PetsAvailableOnCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(city: string) {
    const pets = await this.petsRepository.fetchPetsAvailableOnCity(city)

    if (pets.length === 0) throw new PetsNotFoundError()

    return { pets }
  }
}
