import { PrismaClient } from "@/generated/client.ts";
import { listEstatusAsignacionesBasicRaw } from "../repository/read.ts";

/** Lista estatus de asignaciónes */
export const listEstatusTrabajosService = async (prisma: PrismaClient) => {
  return await listEstatusAsignacionesBasicRaw(prisma);
};
