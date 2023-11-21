import { makeGetPetUseCase } from "@/use-cases/factories/make-get-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const getPetParamsSchema = z.object({
    petId: z.string(),
  });

  const { petId } = getPetParamsSchema.parse(request.params);

  const getPet = makeGetPetUseCase();

  const { pet } = await getPet.execute({
    id: petId,
  });

  return reply.status(200).send({
    pet,
  });
}
