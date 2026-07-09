import { PrismaClient } from "@/generated/client.ts";

import { findEstadoDetailRawById } from "../repository/read.ts";
import { toEstadoDetail } from "@/modules/estados/repository/mapper.ts";

import { estadosErrors } from "../errors.ts";

/** Obtiene un estado por id y lo transforma al formato publico de respuesta. */
export const getEstadoByIdService = async (
  prisma: PrismaClient,
  id: number,
) => {
  const estadoRaw = await findEstadoDetailRawById(prisma, id);

  if (!estadoRaw) {
    throw estadosErrors.notFound;
  }

  return toEstadoDetail(estadoRaw);
};
