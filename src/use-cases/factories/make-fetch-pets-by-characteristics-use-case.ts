import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { FetchPetsByCharacteristcsUseCase } from "../fetch-pets-by-characteristcs";

export function makeFetchPetsByCharacteristicsUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const fetchPetsByCharacteristicsUseCase =
    new FetchPetsByCharacteristcsUseCase(petsRepository);

  return fetchPetsByCharacteristicsUseCase;
}
