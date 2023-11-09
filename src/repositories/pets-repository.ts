import { Pet, Prisma } from "@prisma/client"

export type PetsRepository = {
  register(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findPetById(petId: string): Promise<Pet | null>
  fetchPetsAvailableOnCity(city: string): Promise<Pet[]>
}
