import { PetsRepository } from "@/repositories/pets-repository"
import { PetNotFoundError } from "../errors"

export class PetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(petId: string) {
    const pet = await this.petsRepository.findPetById(petId)

    if (!pet) throw new PetNotFoundError()

    return { pet }
  }
}
