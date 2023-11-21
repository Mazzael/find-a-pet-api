import { Pet, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { FindManyByCharacteristics, PetsRepository } from "../pets-repository";
import { OrgsRepository } from "../orgs-repository";

export class InMemoryPetsRepository implements PetsRepository {
  constructor(private orgsRepository: OrgsRepository) {}
  public items: Pet[] = [];

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }

  async findPetsByCity(city: string) {
    const orgs = await this.orgsRepository.findManyByCity(city);

    if (!orgs) {
      return null;
    }

    const petsByOrgsInCity = this.items.filter((item) => {
      return orgs.find((org) => org.id === item.org_id);
    });

    return petsByOrgsInCity;
  }

  async findPetsByCharacteristics(characteristics: FindManyByCharacteristics) {
    return this.items.filter(
      (items) =>
        (characteristics.age === null || items.age === characteristics.age) &&
        (characteristics.size === null ||
          items.size === characteristics.size) &&
        (characteristics.energy === null ||
          items.energy === characteristics.energy) &&
        (characteristics.emotionalDependence === null ||
          items.emotional_dependence === characteristics.emotionalDependence)
    );
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ?? null,
      age: data.age,
      size: data.size,
      energy: data.energy,
      emotional_dependence: data.emotional_dependence,
      pet_image: data.pet_image,
      org_id: data.org_id,
    };

    this.items.push(pet);

    return pet;
  }
}
