import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { RegisterUseCase } from "./register";
import { beforeEach, describe, expect, it } from "vitest";
import { compare } from "bcryptjs";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";

let orgsRepository: InMemoryOrgsRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new RegisterUseCase(orgsRepository);
  });

  it("should be able to register", async () => {
    const { org } = await sut.execute({
      ownerName: "John Doe",
      email: "johndoe@example.com",
      cep: "99999999",
      adress: "Random Street",
      city: "Random City",
      whatsapp: "99999999999",
      password: "123456",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should hash org password upon registration", async () => {
    const { org } = await sut.execute({
      ownerName: "John Doe",
      email: "johndoe@example.com",
      cep: "99999999",
      adress: "Random Street",
      city: "Random City",
      whatsapp: "99999999999",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      org.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const { org } = await sut.execute({
      ownerName: "John Doe",
      email: "johndoe@example.com",
      cep: "99999999",
      adress: "Random Street",
      city: "Random City",
      whatsapp: "99999999999",
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        ownerName: "John Doe2",
        email: "johndoe@example.com",
        cep: "99999999",
        adress: "Random Street2",
        city: "Random City",
        whatsapp: "999999999992",
        password: "1234562",
      })
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });

  it("should not be able to register with same adress twice", async () => {
    const { org } = await sut.execute({
      ownerName: "John Doe",
      email: "johndoe@example.com",
      cep: "99999999",
      adress: "Random Street",
      city: "Random City",
      whatsapp: "99999999999",
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        ownerName: "John Doe2",
        email: "johndoe2@example.com",
        cep: "99999999",
        adress: "Random Street",
        city: "Random City",
        whatsapp: "999999999992",
        password: "1234562",
      })
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });

  it("should not be able to register with same whatsapp twice", async () => {
    const { org } = await sut.execute({
      ownerName: "John Doe",
      email: "johndoe@example.com",
      cep: "99999999",
      adress: "Random Street",
      city: "Random City",
      whatsapp: "99999999999",
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        ownerName: "John Doe2",
        email: "johndoe2@example.com",
        cep: "99999999",
        adress: "Random Street2",
        city: "Random City",
        whatsapp: "99999999999",
        password: "1234562",
      })
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });
});
