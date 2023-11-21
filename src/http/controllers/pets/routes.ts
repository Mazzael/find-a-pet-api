import { FastifyInstance } from "fastify";
import multer from "fastify-multer";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { petRegister } from "./pet-register";
import { fetchPetsByCharacteristics } from "./fetch-pets-by-characteristics";
import { fetchPetsByCity } from "./fetch-pets-by-city";
import { getPet } from "./get-pet";

export async function petsRoutes(app: FastifyInstance) {
  const upload = multer({ dest: "uploads/" });

  app.post(
    "/pets",
    { preHandler: upload.single("image"), onRequest: [verifyJWT] },
    petRegister
  );

  app.get("/petsCharacteristics", fetchPetsByCharacteristics);

  app.get("/petsCity", fetchPetsByCity);

  app.get("/pets/:petId", getPet);
}
