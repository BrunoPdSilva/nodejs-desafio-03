import { ORGsRepository } from "@/repositories/orgs-repository"
import { Prisma } from "@prisma/client"
import { hash } from "bcryptjs"
import { OrgAlreadyExistsError } from "../errors"

export class RegisterUseCase {
  constructor(private orgsRepository: ORGsRepository) {}

  async execute(data: Prisma.OrgCreateInput) {
    const orgAlreadyExists = await this.orgsRepository.findOrgByNameOrEmail(
      data.name,
      data.email
    )

    if (orgAlreadyExists) throw new OrgAlreadyExistsError()

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
