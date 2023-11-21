import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcryptjs";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let orgsRepository: InMemoryOrgsRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateUseCase(orgsRepository);
  });

  it("should be able to authenticate", async () => {
    await orgsRepository.create({
      owner_name: "John Doe",
      email: "johndoe@example.com",
      cep: "99999999",
      adress: "Random Street",
      city: "Random City",
      whatsapp: "99999999999",
      password_hash: await hash("123456", 6),
    });

    const { org } = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await orgsRepository.create({
      owner_name: "John Doe",
      email: "johndoe@example.com",
      cep: "99999999",
      adress: "Random Street",
      city: "Random City",
      whatsapp: "99999999999",
      password_hash: await hash("123456", 6),
    });

    expect(() =>
      sut.execute({
        email: "johndoe2@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to register with same email twice", async () => {
    await orgsRepository.create({
      owner_name: "John Doe",
      email: "johndoe@example.com",
      cep: "99999999",
      adress: "Random Street",
      city: "Random City",
      whatsapp: "99999999999",
      password_hash: await hash("123456", 6),
    });

    expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "1234567",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
