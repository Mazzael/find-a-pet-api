import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org";

describe("Get Org (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get an org", async () => {
    const { token } = await createAndAuthenticateOrg(app);

    const orgResponse = await request(app.server)
      .get("/myorg")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(orgResponse.statusCode).toEqual(200);
    expect(orgResponse.body.org).toEqual(
      expect.objectContaining({
        email: "johndoe@example.com",
      })
    );
  });
});
