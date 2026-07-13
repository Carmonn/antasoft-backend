import { PrismaClient } from "@/generated/client.ts";
import { listEstatusHonorariosBasicRaw } from "../repository/read.ts";

/** Lista estatus de honorarios */
export const listEstatusHonorariosService = async (prisma: PrismaClient) => {
  return await listEstatusHonorariosBasicRaw(prisma);
};
