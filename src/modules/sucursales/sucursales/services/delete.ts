import { PrismaClient } from "@/generated/client.ts";

import type { SucursalDetail } from "../schemas/response.ts";

import { findSucursalDetailRawById } from "../repository/read.ts";
import { deleteSucursalAggregate } from "../repository/write.ts";
import { toSucursalDetail } from "../repository/mapper.ts";

import { sucursalesErrors } from "../errors.ts";

/** Elimina una sucursal */
export const deleteSucursalService = async (
  prisma: PrismaClient,
  id: number,
): Promise<SucursalDetail> => {
  const sucursalRaw = await findSucursalDetailRawById(prisma, id);

  if (!sucursalRaw) {
    throw sucursalesErrors.notFound;
  }
  await deleteSucursalAggregate(prisma, id);

  return toSucursalDetail(sucursalRaw);
};
