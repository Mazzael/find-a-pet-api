import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { FindManyByCharacteristics, PetsRepository } from "../pets-repository";

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findFirst({
      where: {
        id,
      },
    });

    return pet;
  }

  async findPetsByCity(city: string) {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city: {
            equals: city,
          },
        },
      },
    });

    return pets;
  }

  async findPetsByCharacteristics(characteristics: FindManyByCharacteristics) {
    const where = {};

    where.org = {
      city: characteristics.city,
    };

    if (characteristics.age) {
      where.age = characteristics.age;
    }

    if (characteristics.size) {
      where.size = characteristics.size;
    }

    if (characteristics.energy) {
      where.energy = characteristics.energy;
    }

    if (characteristics.emotionalDependence) {
      where.emotionalDependence = characteristics.emotionalDependence;
    }

    const pets = await prisma.pet.findMany({
      where,
    });

    return pets;
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }
}
