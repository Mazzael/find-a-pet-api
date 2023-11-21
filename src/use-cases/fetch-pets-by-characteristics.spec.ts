import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { FetchPetsByCharacteristcsUseCase } from "./fetch-pets-by-characteristcs";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: FetchPetsByCharacteristcsUseCase;

describe("Fetch Pets By Characteristics Use Case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new FetchPetsByCharacteristcsUseCase(petsRepository);
  });

  it("should be able to fetch pets by characteristics", async () => {
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

    await petsRepository.create({
      name: "Pet Doe1",
      description: "",
      age: "Adult",
      size: "Big",
      energy: "Infinity",
      emotional_dependence: "Medium",
      pet_image: "image1",
      org_id: "org-01",
    });

    await petsRepository.create({
      name: "Pet Doe2",
      description: "",
      age: "Adult",
      size: "Small",
      energy: "Zero",
      emotional_dependence: "High",
      pet_image: "image2",
      org_id: "org-01",
    });

    await petsRepository.create({
      name: "Pet Doe3",
      description: "",
      age: "Baby",
      size: "Small",
      energy: "Zero",
      emotional_dependence: "Low",
      org_id: "org-01",
      pet_image: "image3",
    });

    await petsRepository.create({
      name: "Pet Doe4",
      description: "",
      age: "Adult",
      size: "Big",
      energy: "Not that much",
      emotional_dependence: "Low",
      pet_image: "image1",
      org_id: "org-01",
    });

    const { pets } = await sut.execute({
      city: "Random City",
      age: "Adult",
      size: "Big",
      energy: null,
      emotionalDependence: null,
    });

    expect(pets).toHaveLength(2);
  });
});
