import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { PetRegisterUseCase } from "./pet-register";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: PetRegisterUseCase;

describe("Pet Register Use Case", () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new PetRegisterUseCase(petsRepository, orgsRepository);

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
  });

  it("should be able to register a pet", async () => {
    const path = __dirname;
    const u = new URL(`file:///${path}`);

    const { pet } = await sut.execute({
      name: "Pet Doe",
      description: "",
      age: "adult",
      size: "smoll",
      energy: "infinity",
      emotionalDependence: "Medium",
      orgId: "org-01",
      petImage: u,
    });

    expect(pet.id).toEqual(expect.any(String));
  });
});
