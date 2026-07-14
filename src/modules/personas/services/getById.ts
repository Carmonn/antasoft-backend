import { PrismaClient } from "@/generated/client.ts";

import { findPersonaDetailRawById } from "../repository/read.ts";
import { toPersonaDetail } from "../repository/mapper.ts";

import { personasErrors } from "../errors.ts";

/** Obtiene una persona por id y lo transforma al formato publico de respuesta. */
export const getPersonaByIdService = async (
  prisma: PrismaClient,
  id: number,
) => {
  const personaRaw = await findPersonaDetailRawById(prisma, id);

  if (!personaRaw) {
    throw personasErrors.notFound;
  }

  return toPersonaDetail(personaRaw);
};
