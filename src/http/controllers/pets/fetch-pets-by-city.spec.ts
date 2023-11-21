import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org";
import { resolve } from "path";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { createAndAuthenticateOrgFromOtherCity } from "@/utils/test/create-and-authenticate-org-from-other-city";

describe("Fetch Pets By City (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to fetch pets by city", async () => {
    var { token } = await createAndAuthenticateOrg(app);
    const { tokenOtherCity } = await createAndAuthenticateOrgFromOtherCity(app);

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .attach("image", resolve(__dirname, "../../../../tmp/test.jpeg"))
      .field("name", "Pet Doe1")
      .field("description", "Insane")
      .field("age", "Adult")
      .field("size", "Big")
      .field("energy", "Infinity")
      .field("emotionalDependence", "Medium");

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .attach("image", resolve(__dirname, "../../../../tmp/test.jpeg"))
      .field("name", "Pet Doe2")
      .field("description", "Insane")
      .field("age", "Adult")
      .field("size", "Small")
      .field("energy", "Zero")
      .field("emotionalDependence", "High");

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${tokenOtherCity}`)
      .attach("image", resolve(__dirname, "../../../../tmp/test.jpeg"))
      .field("name", "Pet Doe3")
      .field("description", "Insane")
      .field("age", "Baby")
      .field("size", "Small")
      .field("energy", "Zero")
      .field("emotionalDependence", "Low");

    await prisma.org.create({
      data: {
        id: "org-03",
        owner_name: "John Doe3",
        email: "johndoe3@example.com",
        cep: "998878583",
        adress: "Random Street 3",
        city: "Random City",
        whatsapp: "82746294837",
        password_hash: await hash("1234563", 6),
      },
    });

    const authResponse = await request(app.server).post("/sessions").send({
      email: "johndoe3@example.com",
      password: "1234563",
    });

    var { token } = authResponse.body;

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .attach("image", resolve(__dirname, "../../../../tmp/test.jpeg"))
      .field("name", "Pet Doe4")
      .field("description", "Insane")
      .field("age", "Adult")
      .field("size", "Big")
      .field("energy", "Not that much")
      .field("emotionalDependence", "Low");

    const pets = await request(app.server)
      .get("/petsCity")
      .query({
        city: "Random City",
      })
      .send();

    expect(pets.body.pets).toEqual([
      expect.objectContaining({
        name: "Pet Doe1",
      }),

      expect.objectContaining({
        name: "Pet Doe2",
      }),

      expect.objectContaining({
        name: "Pet Doe4",
      }),
    ]);
  });
});
