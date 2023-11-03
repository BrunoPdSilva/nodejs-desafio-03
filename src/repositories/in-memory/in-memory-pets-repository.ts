import { Pet, Prisma } from "@prisma/client"
import { PetsRepository } from "../pets-repository"
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
}
