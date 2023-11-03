import { Org, Prisma } from "@prisma/client"
import { ORGsRepository } from "../orgs-repository"
import { randomUUID } from "node:crypto"

export class InMemoryORGsRepository implements ORGsRepository {
  public orgs: Org[] = []

  async register(data: Prisma.OrgCreateInput): Promise<Org> {
    const org: Org = { ...data, id: data.id ?? randomUUID() }

    this.orgs.push(org)

    return org
  }

  async findOrgByName(name: string) {
    const org = this.orgs.find(org => org.name === name)
    return org ?? null
  }

  async findOrgByEmail(email: string) {
    const org = this.orgs.find(org => org.email === email)
    return org ?? null
  }

  async findOrgById(orgId: string) {
    const org = this.orgs.find(org => org.id === orgId)
    return org ?? null
  }
}
