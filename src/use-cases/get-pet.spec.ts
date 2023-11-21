import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { GetPetUseCase } from "./get-pet";
import { PetDoesntExistError } from "./errors/pet-doesnt-exist-error";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: GetPetUseCase;

describe("Fetch Pets By Characteristics Use Case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new GetPetUseCase(petsRepository);
  });

  it("should be able to get a pet by id", async () => {
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
      id: "pet-01",
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
      id: "pet-02",
      name: "Pet Doe2",
      description: "",
      age: "Adult",
      size: "Smoll",
      energy: "Zero",
      emotional_dependence: "High",
      pet_image: "image2",
      org_id: "org-01",
    });

    await petsRepository.create({
      id: "pet-03",
      name: "Pet Doe3",
      description: "",
      age: "Adult",
      size: "Smoll",
      energy: "Zero",
      emotional_dependence: "High",
      pet_image: "image2",
      org_id: "org-01",
    });

    const { pet } = await sut.execute({
      id: "pet-02",
    });

    expect(pet.name).toEqual("Pet Doe2");
  });

  it("should not be able to get a pet with an invalid id", async () => {
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
      id: "pet-01",
      name: "Pet Doe1",
      description: "",
      age: "Adult",
      size: "Big",
      energy: "Infinity",
      emotional_dependence: "Medium",
      pet_image: "image1",
      org_id: "org-01",
    });

    await expect(
      sut.execute({
        id: "pet-02",
      })
    ).rejects.toBeInstanceOf(PetDoesntExistError);
  });
});
