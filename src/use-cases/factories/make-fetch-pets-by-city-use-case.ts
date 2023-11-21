import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { FetchPetsByCityUseCase } from "../fetch-pets-by-city";

export function makeFetchPetsByCityUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const petsRepository = new PrismaPetsRepository();
  const fetchPetsByCityUseCase = new FetchPetsByCityUseCase(
    petsRepository,
    orgsRepository
  );

  return fetchPetsByCityUseCase;
}
