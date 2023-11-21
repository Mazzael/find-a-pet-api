import { Pet } from "@prisma/client";
import { PetsRepository } from "@/repositories/pets-repository";
import { FilterPetsByCharacteristicsError } from "./errors/filter-pets-by-characteristics-error";
import { NoCityFilterError } from "./errors/no-city-filter-error";

interface FetchPetsByCharacteristcsUseCaseRequest {
  city: string;
  age: string | null;
  size: string | null;
  energy: string | null;
  emotionalDependence: string | null;
}

interface FetchPetsByCharacteristcsUseCaseResponse {
  pets: Pet[];
}

export class FetchPetsByCharacteristcsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    size,
    energy,
    emotionalDependence,
  }: FetchPetsByCharacteristcsUseCaseRequest): Promise<FetchPetsByCharacteristcsUseCaseResponse> {
    if (!city) {
      throw new NoCityFilterError();
    }

    const pets = await this.petsRepository.findPetsByCharacteristics({
      city,
      age,
      size,
      energy,
      emotionalDependence,
    });

    if (!pets) {
      throw new FilterPetsByCharacteristicsError();
    }

    return {
      pets,
    };
  }
}
