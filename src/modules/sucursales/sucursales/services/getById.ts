import { PrismaClient } from "@/generated/client.ts";

import { findSucursalDetailRawById } from "../repository/read.ts";
import { toSucursalDetail } from "../repository/mapper.ts";

import { sucursalesErrors } from "../errors.ts";

/** Obtiene una sucursal por id y lo transforma al formato publico de respuesta. */
export const getSucursalByIdService = async (
  prisma: PrismaClient,
  id: number,
) => {
  const sucursalRaw = await findSucursalDetailRawById(prisma, id);

  if (!sucursalRaw) {
    throw sucursalesErrors.notFound;
  }

  return toSucursalDetail(sucursalRaw);
};
