import { PrismaClient } from "@/generated/client.ts";

import { listEstadosBasicRaw } from "../repository/read.ts";
import { toEstadoBasic } from "../repository/mapper.ts";

/** Lista estados */
export const listEstadosService = async (prisma: PrismaClient) => {
  return (await listEstadosBasicRaw(prisma)).map(toEstadoBasic);
};
