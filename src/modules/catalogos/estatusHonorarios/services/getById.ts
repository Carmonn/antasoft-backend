import { PrismaClient } from "@/generated/client.ts";

import { findEstatusHonorarioBasicRawById } from "../repository/read.ts";

import { estatusHonorariosErrors } from "../errors.ts";

/** Obtiene un estatus de honorario por id y lo transforma al formato publico de respuesta. */
export const getEstatusHonorarioByIdService = async (
  prisma: PrismaClient,
  id: number,
) => {
  const estatusHonorarioRaw = await findEstatusHonorarioBasicRawById(
    prisma,
    id,
  );

  if (!estatusHonorarioRaw) {
    throw estatusHonorariosErrors.notFound;
  }

  return estatusHonorarioRaw;
};
