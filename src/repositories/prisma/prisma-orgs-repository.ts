import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";

export class PrismaOrgsRepository implements OrgsRepository {
  async findById(id: string) {
    const org = await prisma.org.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });

    return org;
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    });

    return org;
  }

  async findManyByCity(city: string) {
    const orgs = await prisma.org.findMany({
      where: {
        city: {
          equals: city,
        },
      },
    });

    return orgs;
  }

  async findByAdress(adress: string) {
    const org = await prisma.org.findUnique({
      where: {
        adress,
      },
    });

    return org;
  }

  async findByWhatsapp(whatsapp: string) {
    const org = await prisma.org.findUnique({
      where: {
        whatsapp,
      },
    });

    return org;
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    });

    return org;
  }
}
