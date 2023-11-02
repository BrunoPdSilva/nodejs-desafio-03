import { Org, Prisma } from "@prisma/client"
import { ORGsRepository } from "../orgs-repository"
import { randomUUID } from "node:crypto"

export class InMemoryORGsRepository implements ORGsRepository {
  public orgs: Org[] = []

  async register(data: Prisma.OrgCreateInput): Promise<Org> {
    const org: Org = { ...data, id: randomUUID() }

    this.orgs.push(org)

    return org
  }

  async findOrgByNameOrEmail(name: string, email: string) {
    const org = this.orgs.find(org => org.name === name || org.email === email)
    return org ?? null
  }
}
