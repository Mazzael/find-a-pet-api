import { Pet } from "@prisma/client";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { OrgDoesntExistError } from "./errors/org-doesnt-exist-error";

interface PetRegisterUseCaseRequest {
  name: string;
  description: string | null;
  age: string;
  size: string;
  energy: string;
  emotionalDependence: string;
  petImage: any;
  orgId: string;
}

interface PetRegisterUseCaseResponse {
  pet: Pet;
}

export class PetRegisterUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) {}

  async execute({
    name,
    description,
    age,
    size,
    energy,
    emotionalDependence,
    petImage,
    orgId,
  }: PetRegisterUseCaseRequest): Promise<PetRegisterUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId);

    if (!org) {
      throw new OrgDoesntExistError();
    }

    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      size,
      energy,
      emotional_dependence: emotionalDependence,
      pet_image: `@/uploads/${petImage}.jpg`,
      org_id: org.id,
    });

    return {
      pet,
    };
  }
}
