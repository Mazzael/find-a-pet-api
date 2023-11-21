import { OrgAlreadyExistsError } from "@/use-cases/errors/org-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    ownerName: z.string(),
    email: z.string(),
    cep: z.string(),
    adress: z.string(),
    city: z.string(),
    whatsapp: z.string(),
    password: z.string(),
  });

  const { ownerName, email, cep, adress, city, whatsapp, password } =
    registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
      ownerName,
      email,
      cep,
      adress,
      city,
      password,
      whatsapp,
    });
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    return reply.status(500).send();
  }

  return reply.status(201).send();
}
