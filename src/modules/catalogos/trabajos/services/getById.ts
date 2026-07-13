import { PrismaClient } from "@/generated/client.ts";

import { findTrabajoBasicRawById } from "../repository/read.ts";

import { trabajosErrors } from "../errors.ts";

/** Obtiene un trabajo por id y lo transforma al formato publico de respuesta. */
export const getTrabajoByIdService = async (
  prisma: PrismaClient,
  id: number,
) => {
  const trabajoRaw = await findTrabajoBasicRawById(prisma, id);

  if (!trabajoRaw) {
    throw trabajosErrors.notFound;
  }

  return trabajoRaw;
};
