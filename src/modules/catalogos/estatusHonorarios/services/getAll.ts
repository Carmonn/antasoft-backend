import { PrismaClient } from "@/generated/client.ts";

import { listEstatusHonorariosBasicRaw } from "../repository/read.ts";
import { toEstatusHonorarioBasic } from "../repository/mapper.ts";

/** Lista estatus de honorarios */
export const listEstatusHonorariosService = async (prisma: PrismaClient) => {
  return (await listEstatusHonorariosBasicRaw(prisma)).map(
    toEstatusHonorarioBasic,
  );
};
