import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateOrgFromOtherCity(
  app: FastifyInstance
) {
  const org = await prisma.org.create({
    data: {
      id: "org-02",
      owner_name: "John Doe2",
      email: "johndoe2@example.com",
      cep: "998878582",
      adress: "Random Street 2",
      city: "Random City 2",
      whatsapp: "819964738292",
      password_hash: await hash("1234562", 6),
    },
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "johndoe2@example.com",
    password: "1234562",
  });

  const { tokenOtherCity } = authResponse.body;

  return {
    tokenOtherCity,
  };
}
