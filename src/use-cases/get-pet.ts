import { Pet } from "@prisma/client";
import { PetsRepository } from "@/repositories/pets-repository";
import { PetDoesntExistError } from "./errors/pet-doesnt-exist-error";

interface GetPetUseCaseRequest {
  id: string;
}

interface GetPetUseCaseResponse {
  pet: Pet;
}

export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(id);

    if (!pet) {
      throw new PetDoesntExistError();
    }

    return {
      pet,
    };
  }
}
