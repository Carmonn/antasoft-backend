import { PrismaClient } from "@/generated/client.ts";

import { findHonorarioDetailRawById } from "../repository/read.ts";
import { toHonorarioDetail } from "../repository/mapper.ts";

import { honorariosErrors } from "../errors.ts";

/** Obtiene un honorario por id y lo transforma al formato publico de respuesta. */
export const getHonorarioByIdService = async (
  prisma: PrismaClient,
  id: number,
) => {
  const honorarioRaw = await findHonorarioDetailRawById(prisma, id);

  if (!honorarioRaw) {
    throw honorariosErrors.notFound;
  }

  return toHonorarioDetail(honorarioRaw);
};
