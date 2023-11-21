import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

describe("Get Pet By Id (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get pet by id", async () => {
    await prisma.org.create({
      data: {
        id: "org-01",
        owner_name: "John Doe",
        adress: "Random Street",
        cep: "92837465",
        city: "Random City",
        whatsapp: "82910438274",
        email: "johndoe@example.com",
        password_hash: await hash("123456", 6),
      },
    });

    await prisma.pet.create({
      data: {
        id: "pet-01",
        name: "Pet Doe",
        description: "Insane",
        age: "Adult",
        size: "Small",
        energy: "Zero",
        emotional_dependence: "High",
        org_id: "org-01",
        pet_image: "",
      },
    });

    const pet = await prisma.pet.create({
      data: {
        id: "pet-02",
        name: "Pet Doe2",
        description: "Insane",
        age: "Baby",
        size: "Big",
        energy: "Eletric",
        emotional_dependence: "High",
        org_id: "org-01",
        pet_image: "",
      },
    });

    await prisma.pet.create({
      data: {
        id: "pet-03",
        name: "Pet Doe3",
        description: "Insane",
        age: "Old",
        size: "Mid Size",
        energy: "Zeri",
        emotional_dependence: "Very High",
        org_id: "org-01",
        pet_image: "",
      },
    });

    const getPetResponse = await request(app.server)
      .get(`/pets/${pet.id}`)
      .send();

    expect(getPetResponse.body.pet).toEqual(
      expect.objectContaining({
        id: "pet-02",
      })
    );
  });
});
