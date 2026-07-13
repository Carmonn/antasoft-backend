import { PrismaClient } from "@/generated/client.ts";
import { listTrabajosBasicRaw } from "../repository/read.ts";

/** Lista trabajos */
export const listTrabajosService = async (prisma: PrismaClient) => {
  return await listTrabajosBasicRaw(prisma);
};
