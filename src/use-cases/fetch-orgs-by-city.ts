import { Org } from "@prisma/client";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { NoOrgsOnQueriedCityError } from "./errors/no-orgs-on-queried-city-error";

interface FetchOrgsByCityUseCaseRequest {
  city: string;
}

interface FetchOrgsByCityUseCaseResponse {
  orgs: Org[];
}

export class FetchOrgsByCityUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    city,
  }: FetchOrgsByCityUseCaseRequest): Promise<FetchOrgsByCityUseCaseResponse> {
    const orgs = await this.orgsRepository.findManyByCity(city);

    if (!orgs) {
      throw new NoOrgsOnQueriedCityError();
    }

    return {
      orgs,
    };
  }
}
