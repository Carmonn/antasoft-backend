import { PrismaClient } from "@/generated/client.ts";

import { listSucursalesDetailRaw } from "../repository/read.ts";
import { toSucursalDetail } from "../repository/mapper.ts";

/** Lista sucursales */
export const listSucursalesService = async (prisma: PrismaClient) => {
  return (await listSucursalesDetailRaw(prisma)).map(toSucursalDetail);
};
