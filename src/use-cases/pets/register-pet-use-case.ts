import { ORGsRepository } from "@/repositories/orgs-repository"
import { PetsRepository } from "@/repositories/pets-repository"
import { Prisma } from "@prisma/client"
import { OrgNotFoundError } from "../errors"

type RegisterParams = {
  name: string
  age: string
  description: string
  independence: string
  energy: number
  size: string
  space_required: string
  requirements: string[]
}

export class RegisterPetUseCase {
  constructor(
    private orgsRepository: ORGsRepository,
    private petsRepository: PetsRepository
  ) {}

  async execute(data: RegisterParams, orgId: string) {
    const org = await this.orgsRepository.findOrgById(orgId)

    if (!org) throw new OrgNotFoundError()

    const pet = await this.petsRepository.register({ ...data, orgId })

    return { pet }
  }
}
