import { Prisma, Org } from "@prisma/client"
import { ORGsRepository } from "../orgs-repository"
import { prisma } from "@/lib/prisma"

export class PrismaORGsRepository implements ORGsRepository {
  async register(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = await prisma.org.create({ data })
    return org
  }

  async findOrgByNameOrEmail(name: string, email: string): Promise<Org | null> {
    const org = await prisma.org.findFirst({
      where: {
        OR: [{ name }, { email }],
      },
    })

    return org
  }
}
