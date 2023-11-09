import { Pet, Prisma } from "@prisma/client"
import { PetFeatures, PetsRepository } from "../pets-repository"
import { prisma } from "@/lib/prisma"

export class PrismaPetsRepository implements PetsRepository {
  async register(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data })
    return pet
  }

  async findPetById(petId: string): Promise<Pet | null> {
    const pet = await prisma.pet.findFirst({
      where: { id: petId },
      include: {
        org: {
          select: {
            id: true,
            name: true,
            email: true,
            contact: true,
            representative: true,
            state: true,
            city: true,
            zipcode: true,
            street: true,
          },
        },
      },
    })

    return pet
  }

  async fetchPetsAvailableOnCity(city: string): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: { org: { city } },
      include: {
        org: {
          select: {
            id: true,
            name: true,
            email: true,
            contact: true,
            representative: true,
            state: true,
            city: true,
            zipcode: true,
            street: true,
          },
        },
      },
    })

    return pets
  }

  async fetchPetsByFeature(features: PetFeatures) {
    const keys = Object.keys(features)
    const pets = await prisma.pet.findMany({
      where: {
        OR: keys.map(key => ({ [key]: features[key] })),
      },
    })

    return pets
  }
}
