import { Org } from "@prisma/client";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { NoOrgsOnQueriedCityError } from "./errors/no-orgs-on-queried-city-error";

interface GetOrgUseCaseRequest {
  id: string;
}

interface GetOrgUseCaseResponse {
  org: Org;
}

export class GetOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({ id }: GetOrgUseCaseRequest): Promise<GetOrgUseCaseResponse> {
    const org = await this.orgsRepository.findById(id);

    if (!org) {
      throw new NoOrgsOnQueriedCityError();
    }

    return {
      org,
    };
  }
}
