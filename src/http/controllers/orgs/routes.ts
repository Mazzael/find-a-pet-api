import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { getOrg } from "./get-org";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { fetchOrgsByCity } from "./fetch-orgs-by-city";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", register);
  app.post("/sessions", authenticate);
  app.get("/cityorgs", fetchOrgsByCity);

  app.get("/myorg", { onRequest: [verifyJWT] }, getOrg);
}
