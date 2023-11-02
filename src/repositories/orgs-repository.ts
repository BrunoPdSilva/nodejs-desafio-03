import { Prisma, Org } from "@prisma/client"

export type ORGsRepository = {
  register(data: Prisma.OrgCreateInput): Promise<Org>
  findOrgByNameOrEmail(name: string, email: string): Promise<Org | null>
}
