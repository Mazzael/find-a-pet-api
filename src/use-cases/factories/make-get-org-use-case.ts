import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { GetOrgUseCase } from "../get-org";

export function makeGetOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const getOrgUseCase = new GetOrgUseCase(orgsRepository);

  return getOrgUseCase;
}
