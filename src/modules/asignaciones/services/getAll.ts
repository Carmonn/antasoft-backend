import { PrismaClient } from "@/generated/client.ts";

import { listAsignacionesDetailRaw } from "../repository/read.ts";
import { toAsignacionDetail } from "../repository/mapper.ts";

/** Lista asignaciones */
export const listAsignacionesService = async (prisma: PrismaClient) => {
  return (await listAsignacionesDetailRaw(prisma)).map(toAsignacionDetail);
};
