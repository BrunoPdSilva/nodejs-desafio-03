import { ORGsRepository } from "@/repositories/orgs-repository"
import { InvalidCredentialsError } from "../errors"
import { compare } from "bcryptjs"

type AuthenticateParams = { email: string; password: string }

export class AuthenticateUseCase {
  constructor(private orgsRepository: ORGsRepository) {}

  async execute({ email, password }: AuthenticateParams) {
    const org = await this.orgsRepository.findOrgByEmail(email)

    if (!org) throw new InvalidCredentialsError()

    const doesPasswordsMatch = await compare(password, org.password)

    if (!doesPasswordsMatch) throw new InvalidCredentialsError()

    return {
      org: {
        ...org,
        password: undefined,
      },
    }
  }
}
