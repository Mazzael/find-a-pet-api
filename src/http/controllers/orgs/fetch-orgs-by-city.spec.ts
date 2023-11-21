import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Fetch Orgs By City (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to fetch orgs by city", async () => {
    await request(app.server).post("/orgs").send({
      ownerName: "John Doe",
      email: "johndoe@example.com",
      cep: "99887858",
      adress: "Random Street",
      city: "Random City",
      whatsapp: "81996473829",
      password: "123456",
    });

    await request(app.server).post("/orgs").send({
      ownerName: "John Doe 2",
      email: "johndoe2@example.com",
      cep: "998878582",
      adress: "Random Street 2",
      city: "Random City",
      whatsapp: "819964738292",
      password: "123456",
    });

    await request(app.server).post("/orgs").send({
      ownerName: "John Doe 3",
      email: "johndoe3@example.com",
      cep: "998878583",
      adress: "Random Street 3",
      city: "Random City 2",
      whatsapp: "819964738293",
      password: "123456",
    });

    const orgsResponse = await request(app.server)
      .get("/cityorgs")
      .query({
        city: "Random City",
      })
      .send();

    expect(orgsResponse.statusCode).toEqual(200);
    expect(orgsResponse.body.orgs[0]).toHaveLength(2);
    expect(orgsResponse.body.orgs).toEqual([
      expect.arrayContaining([
        expect.objectContaining({
          city: "Random City",
        }),
      ]),
    ]);
  });
});
