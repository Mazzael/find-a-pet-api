import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { resolve } from "path";
import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org";

describe("Pet Register (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to register a pet", async () => {
    const { token } = await createAndAuthenticateOrg(app);

    const response = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .attach("image", resolve(__dirname, "../../../../tmp/test.jpeg"))
      .field("name", "Pet Doe")
      .field("description", "Insane")
      .field("age", "Adult")
      .field("size", "Medium")
      .field("energy", "Eletric")
      .field("emotionalDependence", "High");

    expect(response.statusCode).toEqual(201);
  });
});
