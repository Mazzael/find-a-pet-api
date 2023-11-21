import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetOrgUseCase } from "./get-org";

let orgsRepository: InMemoryOrgsRepository;
let sut: GetOrgUseCase;

describe("Fetch Pets By Characteristics Use Case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new GetOrgUseCase(orgsRepository);
  });

  it("should be able to get a org by id", async () => {
    await orgsRepository.create({
      id: "org-01",
      owner_name: "John Doe",
      email: "johndoe@example.com",
      cep: "99999999",
      adress: "Random Street",
      city: "Random City",
      whatsapp: "99999999999",
      password_hash: "123456",
    });

    await orgsRepository.create({
      id: "org-02",
      owner_name: "John Doe2",
      email: "johndoe2@example.com",
      cep: "999999992",
      adress: "Random Street 2",
      city: "Random City 2",
      whatsapp: "999999999992",
      password_hash: "1234562",
    });

    const { org } = await sut.execute({
      id: "org-01",
    });

    expect(org.owner_name).toEqual("John Doe");
  });
});
