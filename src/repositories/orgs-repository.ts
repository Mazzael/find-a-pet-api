import { Org, Prisma } from "@prisma/client";

export interface OrgsRepository {
  findById(id: string): Promise<Org | null>;
  findManyByCity(city: string): Promise<Org[] | null>;
  findByEmail(email: string): Promise<Org | null>;
  findByAdress(adress: string): Promise<Org | null>;
  findByWhatsapp(whatsapp: string): Promise<Org | null>;
  create(data: Prisma.OrgCreateInput): Promise<Org>;
}
