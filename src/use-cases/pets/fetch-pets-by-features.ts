import { PetFeatures, PetsRepository } from "@/repositories/pets-repository"
import { PetsNotFoundError } from "../errors"

export class FetchPetsByFeatures {
  constructor(private petsRepository: PetsRepository) {}

  async execute(features: PetFeatures) {
    const pets = await this.petsRepository.fetchPetsByFeature(features)

    if (!pets) throw new PetsNotFoundError()

    return { pets }
  }
}
