import { makeFetchPetsByCityUseCase } from "@/use-cases/factories/make-fetch-pets-by-city-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchPetsByCity(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchPetsByCityQuerySchema = z.object({
    city: z.string(),
  });

  const { city } = fetchPetsByCityQuerySchema.parse(request.query);

  const fetchPetsByCity = makeFetchPetsByCityUseCase();

  const { pets } = await fetchPetsByCity.execute({
    city,
  });

  return reply.status(200).send({
    pets,
  });
}
