import { Prisma, Org } from "@prisma/client"

export type ORGsRepository = {
  register(data: Prisma.OrgCreateInput): Promise<Org>
  findOrgByName(name: string): Promise<Org | null>
  findOrgByEmail(email: string): Promise<Org | null>
  findOrgById(orgId: string): Promise<Org | null>
}
