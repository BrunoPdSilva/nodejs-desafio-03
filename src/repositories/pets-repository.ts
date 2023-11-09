import { Pet, Prisma } from "@prisma/client"

export type PetFeatures = {
  [key: string]: string | number | undefined
  name?: string
  age?: string
  independence?: string
  size?: string
  energy?: number
  space_required?: string
}

export type PetsRepository = {
  register(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findPetById(petId: string): Promise<Pet | null>
  fetchPetsAvailableOnCity(city: string): Promise<Pet[]>
  fetchPetsByFeature(features: PetFeatures): Promise<Pet[]>
}
