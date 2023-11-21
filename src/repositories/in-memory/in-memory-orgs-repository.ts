import { Org, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { OrgsRepository } from "../orgs-repository";

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = [];

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id);

    if (!org) {
      return null;
    }

    return org;
  }

  async findManyByCity(city: string) {
    return this.items.filter((item) => item.city === city);
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email);

    if (!org) {
      return null;
    }

    return org;
  }

  async findByAdress(adress: string) {
    const org = this.items.find((item) => item.adress === adress);

    if (!org) {
      return null;
    }

    return org;
  }

  async findByWhatsapp(whatsapp: string) {
    const org = this.items.find((item) => item.whatsapp === whatsapp);

    if (!org) {
      return null;
    }

    return org;
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      owner_name: data.owner_name,
      email: data.email,
      cep: data.cep,
      adress: data.adress,
      city: data.city,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,
    };

    this.items.push(org);

    return org;
  }
}
