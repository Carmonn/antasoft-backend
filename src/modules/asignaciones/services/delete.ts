import { PrismaClient } from "@/generated/client.ts";

import type { AsignacionDetail } from "../schemas/response.ts";

import { findAsignacionDetailRawById } from "../repository/read.ts";
import { deleteAsignacionAggregate } from "../repository/write.ts";
import { toAsignacionDetail } from "../repository/mapper.ts";

import { asignacionesErrors } from "../errors.ts";

/** Elimina una asignación */
export const deleteAsignacionService = async (
  prisma: PrismaClient,
  id: number,
): Promise<AsignacionDetail> => {
  const asignacionRaw = await findAsignacionDetailRawById(prisma, id);

  if (!asignacionRaw) {
    throw asignacionesErrors.notFound;
  }
  await deleteAsignacionAggregate(prisma, id);

  return toAsignacionDetail(asignacionRaw);
};
