import { PrismaClient } from "@/generated/client.ts";

import { findAsignacionDetailRawById } from "../repository/read.ts";
import { toAsignacionDetail } from "../repository/mapper.ts";

import { asignacionesErrors } from "../errors.ts";

/** Obtiene una asignación por id y lo transforma al formato publico de respuesta. */
export const getAsignacionByIdService = async (
  prisma: PrismaClient,
  id: number,
) => {
  const asignacionRaw = await findAsignacionDetailRawById(prisma, id);

  if (!asignacionRaw) {
    throw asignacionesErrors.notFound;
  }

  return toAsignacionDetail(asignacionRaw);
};
