import { ORGsRepository } from "@/repositories/orgs-repository"
import { Prisma } from "@prisma/client"
import { hash } from "bcryptjs"
import {
  OrgWithSameNameAlreadyExistsError,
  OrgWithSameEmailAlreadyExistsError,
} from "../errors"

export class RegisterOrgUseCase {
  constructor(private orgsRepository: ORGsRepository) {}

  async execute(data: Prisma.OrgCreateInput) {
    const orgByName = await this.orgsRepository.findOrgByName(data.name)
    const orgByEmail = await this.orgsRepository.findOrgByEmail(data.email)

    if (orgByName) throw new OrgWithSameNameAlreadyExistsError()
    if (orgByEmail) throw new OrgWithSameEmailAlreadyExistsError()

    const org = await this.orgsRepository.register({
      ...data,
      password: await hash(data.password, 6),
    })

    return {
      org: {
        ...org,
        password: undefined,
      },
    }
  }
}
