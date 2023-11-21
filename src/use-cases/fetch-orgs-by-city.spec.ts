import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchOrgsByCityUseCase } from "./fetch-orgs-by-city";

let orgsRepository: InMemoryOrgsRepository;
let sut: FetchOrgsByCityUseCase;

describe("Fetch Pets By City Use Case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new FetchOrgsByCityUseCase(orgsRepository);
  });

  it("should be able to fetch orgs by city", async () => {
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
      cep: "99999999",
      adress: "Random Street 2",
      city: "Random City",
      whatsapp: "999999999992",
      password_hash: "1234562",
    });

    await orgsRepository.create({
      id: "org-03",
      owner_name: "John Doe3",
      email: "johndoe3@example.com",
      cep: "99999999",
      adress: "Random Street 3",
      city: "Random City 2",
      whatsapp: "999999999993",
      password_hash: "1234563",
    });

    await orgsRepository.create({
      id: "org-04",
      owner_name: "John Doe4",
      email: "johndoe4@example.com",
      cep: "99999999",
      adress: "Random Street 4",
      city: "Random City 3",
      whatsapp: "999999999994",
      password_hash: "1234564",
    });

    const { orgs } = await sut.execute({
      city: "Random City",
    });

    expect(orgs).toHaveLength(2);
  });
});
