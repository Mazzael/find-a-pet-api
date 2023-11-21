import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Register Org (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to register an org", async () => {
    const response = await request(app.server).post("/orgs").send({
      ownerName: "John Doe",
      email: "johndoe@example.com",
      cep: "99887858",
      adress: "Random Street",
      city: "Random City",
      whatsapp: "81996473829",
      password: "123456",
    });

    expect(response.statusCode).toEqual(201);
  });
});
