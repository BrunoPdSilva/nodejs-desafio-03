import { Pet, Prisma } from "@prisma/client"
import { PetsRepository } from "../pets-repository"
import { prisma } from "@/lib/prisma"

export class PrismaPetsRepository implements PetsRepository {
  async register(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data })
    return pet
  }

  async findPetById(petId: string): Promise<Pet | null> {
    const pet = await prisma.pet.findFirst({ where: { id: petId } })
    return pet
  }
}
