import { makeGetOrgUseCase } from "@/use-cases/factories/make-get-org-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getOrg(request: FastifyRequest, reply: FastifyReply) {
  const getOrg = makeGetOrgUseCase();

  const { org } = await getOrg.execute({
    id: request.user.sub,
  });

  return reply.status(200).send({
    org: {
      ...org,
      owner_name: undefined,
      password_hash: undefined,
    },
  });
}
