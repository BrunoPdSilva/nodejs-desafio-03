import { Prisma, Org } from "@prisma/client"
import { ORGsRepository } from "../orgs-repository"
import { prisma } from "@/lib/prisma"

export class PrismaORGsRepository implements ORGsRepository {
  async register(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = await prisma.org.create({ data })
    return org
  }

  async findOrgByName(name: string): Promise<Org | null> {
    const org = await prisma.org.findFirst({ where: { name } })

    return org
  }

  async findOrgByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findFirst({ where: { email } })

    return org
  }
}
