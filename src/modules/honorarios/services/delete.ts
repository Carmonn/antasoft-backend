import { PrismaClient } from "@/generated/client.ts";

import type { HonorarioDetail } from "../schemas/response.ts";

import { findHonorarioDetailRawById } from "../repository/read.ts";
import { deleteHonorarioAggregate } from "../repository/write.ts";
import { toHonorarioDetail } from "../repository/mapper.ts";

import { honorariosErrors } from "../errors.ts";

/** Elimina un honorario */
export const deleteHonorarioService = async (
  prisma: PrismaClient,
  id: number,
): Promise<HonorarioDetail> => {
  const honorarioRaw = await findHonorarioDetailRawById(prisma, id);

  if (!honorarioRaw) {
    throw honorariosErrors.notFound;
  }
  await deleteHonorarioAggregate(prisma, id);

  return toHonorarioDetail(honorarioRaw);
};
