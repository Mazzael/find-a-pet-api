import { Pet, Prisma } from "@prisma/client";

export interface FindManyByCharacteristics {
  city: string;
  age: string | null;
  size: string | null;
  energy: string | null;
  emotionalDependence: string | null;
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>;
  findPetsByCity(city: string): Promise<Pet[] | null>;
  findPetsByCharacteristics(
    characteristics: FindManyByCharacteristics
  ): Promise<Pet[] | null>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}
