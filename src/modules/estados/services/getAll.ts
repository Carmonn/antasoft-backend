import { PrismaClient } from "@/generated/client.ts";
import { listEstadosBasicRaw } from "../repository/read.ts";

/** Lista estados */
export const listEstadosService = async (prisma: PrismaClient) => {
  return await listEstadosBasicRaw(prisma);
};
