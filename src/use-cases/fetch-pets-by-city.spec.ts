import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { FetchPetsByCityUseCase } from "./fetch-pets-by-city";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: FetchPetsByCityUseCase;

describe("Fetch Pets By City Use Case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new FetchPetsByCityUseCase(petsRepository, orgsRepository);
  });

  it("should be able to fetch pets by city", async () => {
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

    await petsRepository.create({
      name: "Pet Doe",
      description: "",
      age: "adult",
      size: "smoll",
      energy: "infinity",
      emotional_dependence: "Medium",
      pet_image: "image1",
      org_id: "org-01",
    });

    await petsRepository.create({
      name: "Pet Doe",
      description: "",
      age: "adult",
      size: "smoll",
      energy: "infinity",
      emotional_dependence: "Medium",
      pet_image: "image2",
      org_id: "org-01",
    });

    await petsRepository.create({
      name: "Pet Doe",
      description: "",
      age: "adult",
      size: "smoll",
      energy: "infinity",
      emotional_dependence: "Medium",
      org_id: "org-02",
      pet_image: "image3",
    });

    await petsRepository.create({
      name: "Pet Doe",
      description: "",
      age: "adult",
      size: "smoll",
      energy: "infinity",
      emotional_dependence: "Medium",
      org_id: "org-03",
      pet_image: "image4",
    });

    const { pets } = await sut.execute({
      city: "Random City",
    });

    expect(pets).toHaveLength(3);
  });
});
