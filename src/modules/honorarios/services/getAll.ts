import { PrismaClient } from "@/generated/client.ts";

import { listHonorariosDetailRaw } from "../repository/read.ts";
import { toHonorarioDetail } from "../repository/mapper.ts";

/** Lista honorarios */
export const listHonorariosService = async (prisma: PrismaClient) => {
  return (await listHonorariosDetailRaw(prisma)).map(toHonorarioDetail);
};
