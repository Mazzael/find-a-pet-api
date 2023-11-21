import { makePetRegisterUseCase } from "@/use-cases/factories/make-pet-register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function petRegister(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const petRegisterBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.string(),
    size: z.string(),
    energy: z.string(),
    emotionalDependence: z.string(),
  });

  const { name, description, age, size, energy, emotionalDependence } =
    petRegisterBodySchema.parse(request.body);

  const petImage = request.file.filename;

  const petRegisterUseCase = makePetRegisterUseCase();

  await petRegisterUseCase.execute({
    name,
    description,
    age,
    size,
    energy,
    emotionalDependence,
    petImage,
    orgId: request.user.sub,
  });

  return reply.status(201).send();
}
