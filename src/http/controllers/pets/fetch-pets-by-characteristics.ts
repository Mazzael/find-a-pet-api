import { makeFetchPetsByCharacteristicsUseCase } from "@/use-cases/factories/make-fetch-pets-by-characteristics-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchPetsByCharacteristics(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchPetsByCharacteristicsQuerySchema = z.object({
    city: z.string(),
    age: z.string() || z.null(),
    size: z.string() || z.null(),
    energy: z.string() || z.null(),
    emotionalDependence: z.string() || z.null(),
  });

  const { city, age, size, energy, emotionalDependence } =
    fetchPetsByCharacteristicsQuerySchema.parse(request.query);

  const fetchPetsByCharacteristics = makeFetchPetsByCharacteristicsUseCase();

  const { pets } = await fetchPetsByCharacteristics.execute({
    city,
    age,
    size,
    energy,
    emotionalDependence,
  });

  return reply.status(200).send({
    pets,
  });
}
