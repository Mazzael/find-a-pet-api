import { makeFetchOrgsByCityUseCase } from "@/use-cases/factories/make-fetch-orgs-by-city-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchOrgsByCity(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchOrgsByCityQuerySchema = z.object({
    city: z.string(),
  });

  const { city } = fetchOrgsByCityQuerySchema.parse(request.query);

  const fetchOrgsByCity = makeFetchOrgsByCityUseCase();

  const { orgs } = await fetchOrgsByCity.execute({
    city,
  });

  return reply.status(200).send({
    orgs: [
      orgs.map((org) => {
        return {
          ...org,
          owner_name: undefined,
          password_hash: undefined,
        };
      }),
    ],
  });
}
