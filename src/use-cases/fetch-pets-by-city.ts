import { Pet } from "@prisma/client";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { NoOrgsOnQueriedCityError } from "./errors/no-orgs-on-queried-city-error";
import { NoPetsOnQueriedCityError } from "./errors/no-pets-on-queried-city-error";

interface FetchPetsByCityUseCaseRequest {
  city: string;
}

interface FetchPetsByCityUseCaseResponse {
  pets: Pet[];
}

export class FetchPetsByCityUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) {}

  async execute({
    city,
  }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse> {
    const orgs = await this.orgsRepository.findManyByCity(city);

    if (!orgs) {
      throw new NoOrgsOnQueriedCityError();
    }

    const pets = await this.petsRepository.findPetsByCity(orgs[0].city);

    if (!pets) {
      throw new NoPetsOnQueriedCityError();
    }

    return {
      pets,
    };
  }
}
