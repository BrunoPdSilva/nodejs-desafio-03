import { Pet, Prisma } from "@prisma/client"
import { PetFeatures, PetsRepository } from "../pets-repository"
import { randomUUID } from "node:crypto"

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  async register(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      ...data,
      id: randomUUID(),
      requirements: data.requirements
        ? (data.requirements as Array<string>)
        : [],
    }

    this.pets.push(pet)

    return pet
  }

  async findPetById(petId: string): Promise<Pet | null> {
    const pet = this.pets.find(pet => pet.id === petId)
    return pet ?? null
  }

  async fetchPetsAvailableOnCity(city: string): Promise<Pet[]> {
    const pets = this.pets.filter(pet => pet.org.city === city)
    return pets
  }

  async fetchPetsByFeature(features: PetFeatures) {
    const filteredPets: Pet[] = this.pets.filter(pet => {
      for (const key in features) {
        if (
          features[key] !== undefined &&
          pet[key as keyof Pet] !== features[key]
        ) {
          return false
        }
      }
      return true
    })

    return filteredPets
  }
}
