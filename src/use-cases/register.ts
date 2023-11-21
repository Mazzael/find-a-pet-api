import { hash } from "bcryptjs";
import { Org } from "@prisma/client";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";

interface RegisterUseCaseRequest {
  ownerName: string;
  email: string;
  cep: string;
  adress: string;
  city: string;
  whatsapp: string;
  password: string;
}

interface RegisterUseCaseResponse {
  org: Org;
}

export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    ownerName,
    email,
    cep,
    adress,
    city,
    whatsapp,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email);
    const orgWithSameAdress = await this.orgsRepository.findByAdress(adress);
    const orgWithSameWhatsapp =
      await this.orgsRepository.findByWhatsapp(whatsapp);

    if (orgWithSameEmail || orgWithSameAdress || orgWithSameWhatsapp) {
      throw new OrgAlreadyExistsError();
    }

    const org = await this.orgsRepository.create({
      owner_name: ownerName,
      email,
      cep,
      adress,
      city,
      whatsapp,
      password_hash,
    });

    return {
      org,
    };
  }
}
