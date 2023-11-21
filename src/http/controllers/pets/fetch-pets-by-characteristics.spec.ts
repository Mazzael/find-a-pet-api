import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org";
import { resolve } from "path";
import { createAndAuthenticateOrgFromOtherCity } from "@/utils/test/create-and-authenticate-org-from-other-city";

describe("Fetch Pets By Characteristics (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to fetch pets by characteristics", async () => {
    const { token } = await createAndAuthenticateOrg(app);
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
      .set("Authorization", `Bearer ${token}`)
      .attach("image", resolve(__dirname, "../../../../tmp/test.jpeg"))
      .field("name", "Pet Doe3")
      .field("description", "Insane")
      .field("age", "Baby")
      .field("size", "Small")
      .field("energy", "Zero")
      .field("emotionalDependence", "Low");

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${tokenOtherCity}`)
      .attach("image", resolve(__dirname, "../../../../tmp/test.jpeg"))
      .field("name", "Pet Doe4")
      .field("description", "Insane")
      .field("age", "Adult")
      .field("size", "Big")
      .field("energy", "Not that much")
      .field("emotionalDependence", "Low");

    const pets = await request(app.server)
      .get("/petsCharacteristics")
      .set("Authorization", `Bearer ${token}`)
      .query({
        city: "Random City",
        age: "Adult",
        size: "Big",
        energy: null,
        emotionalDependence: null,
      })
      .send();

    expect(pets.body.pets).toEqual([
      expect.objectContaining({
        name: "Pet Doe1",
      }),
    ]);
  });
});
