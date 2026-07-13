import { PrismaClient } from "@/generated/client.ts";

import { findEstatusAsignacionBasicRawById } from "../repository/read.ts";

import { estatusAsignacionesErrors } from "../errors.ts";

/** Obtiene un estatus de asignación por id y lo transforma al formato publico de respuesta. */
export const getEstatusAsignacionByIdService = async (
  prisma: PrismaClient,
  id: number,
) => {
  const estatusAsignacionRaw = await findEstatusAsignacionBasicRawById(
    prisma,
    id,
  );

  if (!estatusAsignacionRaw) {
    throw estatusAsignacionesErrors.notFound;
  }

  return estatusAsignacionRaw;
};
