import { PrismaClient } from "@/generated/client.ts";

import { findMedioBasicRawById } from "../repository/read.ts";

import { mediosErrors } from "../errors.ts";

/** Obtiene un medio por id y lo transforma al formato publico de respuesta. */
export const getMedioByIdService = async (prisma: PrismaClient, id: number) => {
  const medioRaw = await findMedioBasicRawById(prisma, id);

  if (!medioRaw) {
    throw mediosErrors.notFound;
  }

  return medioRaw;
};
